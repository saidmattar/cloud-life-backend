'use strict';

import * as _ from 'ramda';
import * as util from '../lib/util.js';
import createError from 'http-errors';
import Mongoose, {Schema} from 'mongoose';
import {S3} from 'aws-sdk';

const docSchema = new Schema ({
  url: {type: String, required: true},
  description: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, required: true, ref: 'profile'},
  profile: {type: Schema.Types.ObjectId, required: true, ref: 'profile'},
  tags: [{type: String}],
});

const Doc = Mongoose.model('doc', docSchema);

Doc.validateRequest = function(req) {
  if(req.method === 'POST' && !req.files)
    return Promise.reject(createError(400, 'VALIDATION ERROR: must have a file'));

  if(req.method === 'POST' && req.files.length < 1)
    return Promise.reject(createError(400, 'VALIDATION ERROR: must have a file'));

  if(req.files.length > 1) {
    let err = createError(400, 'VALIDATION ERROR: must have one file');
    return util.removeMulterFiles(req.files)
      .then(() => {throw err;});
  }

  let [file] = req.files;
  if(file) {
    if(file) {
      //what it had previously:     if(file.fieldname !== 'doc') {
      //this is the spot Gavin pointed out about validation of a photo
      let err = createError(400, 'VALIDATION ERROR: file must exist');
      return util.removeMulterFiles(req.files)
        .then(() => {throw err;});
    }
  }

  return Promise.resolve(file);
};

Doc.create = function(req) {
  return Doc.validateRequest(req)
    .then(file => {
      return util.s3UploadMulterFileAndClean(file)
        .then(s3Data => {
          return new Doc({
            url: s3Data.Location,
            description: req.body.description,
            owner: req.user._id,
            profile: req.user.profile,
          }).save();
        });
    })
    .then(doc => {
      return Doc.findById(doc._id)
        .populate('profile');
    });
};

Doc.fetch = util.pagerCreate(Doc, 'tags  profile'); //TODO: Fix this.

Doc.fetchOne = function(req) {
  return Doc.findById(req.params.id)
    .populate('profile tags')
    .then(doc => {
      if(!doc)
        throw createError(404, 'NOT FOUND ERROR: photo not found');
      return doc;
    });
};

Doc.updateDocWithFile = function(req) {
  return Doc.validateRequest(req)
    .then(file => {
      return util.s3UploadMulterFileAndClean(file)
        .then(s3Data => {
          let update = {url: s3Data.Location};
          if(req.body.description) update.description = req.body.description;
          return Doc.findByIdAndUpdate(req.params.id, update, {new: true, runValidators: true});
        });
    });
};

Doc.update = function(req) {
  if(req.files && req.files[0])
    return Doc.updateDocWithFile(req)
      .then(doc => {
        return Doc.findById(doc._id)
          .populate('tags profile');
      });
  let options = {new: true, runValidators: true};
  let update = {description: req.body.description};
  return Doc.findByIdAndUpdate(req.params.id, update, options)
    .then(doc => {
      return Doc.findById(doc._id)
        .populate('tags profile');
    });
};

Doc.delete = function(req) {
  return Doc.findOneAndRemove({_id: req.params.id, owner: req.user._id})
    .then(profile => {
      if(!profile)
        throw createError(404, 'NOT FOUND ERROR: profile not found');
    });
};

export default Doc;
