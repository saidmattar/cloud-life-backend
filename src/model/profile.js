import createError from 'http-errors';
import * as util from '../lib/util.js';
import Mongoose, {Schema} from 'mongoose';

const profileSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, required: true, unique: true, ref: 'profile'},
  email: {type: String, required: true},
  username: {type: String, required: true},
  firstName: {type: String},
  lastName: {type: String},
  alias: {type: String},
  priority: {type: String},
  safeStatus: {type: Boolean},
  avatar: {type: String},
  bio: {type: String},
});

const Profile = Mongoose.model('profile', profileSchema);

Profile.validateReqFile = function (req) {
  if(req.files.length > 1){
    return util.removeMulterFiles(req.files)
      .then(() => {
        throw createError(400, 'VALIDATION ERROR: only one file permited');
      });
  }

  let [file] = req.files;
  if(file)
    if(file.fieldname !== 'avatar')
      return util.removeMulterFiles(req.files)
        .then(() => {
          throw createError(400, 'VALIDATION ERROR: file must be for avatar');
        });

  return Promise.resolve(file);
};

Profile.createProfileWithPhoto = function(req){
  return Profile.validateReqFile(req)
    .then((file) => {
      return util.s3UploadMulterFileAndClean(file)
        .then((s3Data) => {
          return new Profile({
            owner: req.user._id,
            username: req.user.username,
            email: req.user.email,
            bio: req.body.bio,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            groups: req.body.groups,
            alias: req.body.alias,
            priority: req.body.priority,
            safeStatus: req.body.safeStatus,
            avatar: s3Data.Location,
          }).save();
        });
    });
};

Profile.create = function(req){
  console.log('profile create req', req);
  if(req.files.length > 0){
    return Profile.createProfileWithPhoto(req)
      .then(profile => {
        req.user.profile = profile._id;
        return req.user.save()
          .then(() => profile);
      });
  }

  return new Profile({
    owner: req.user._id,
    username: req.user.username,
    email: req.user.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    groups: req.body.groups,
    alias: req.body.alias,
    priority: req.body.priority,
    safeStatus: req.body.safeStatus,
    bio: req.body.bio,
  })
    .save()
    .then(profile => {
      req.user.profile = profile._id;
      return req.user.save()
        .then(() => profile);
    });
};

Profile.fetch = util.pagerCreate(Profile);

Profile.fetchOne = function(req){
  return Profile.findById(req.params.id)
    .then(profile => {
      if(!profile)
        throw createError(404, 'NOT FOUND ERROR: profile not found');
      return profile;
    });
};

Profile.updateProfileWithPhoto = function(req) {
  return Profile.validateReqFile(req)
    .then(file => {
      return util.s3UploadMulterFileAndClean(file)
        .then((s3Data) => {
          let update = {avatar: s3Data.Location};
          if(req.body.bio) update.bio = req.body.bio;
          return Profile.findByIdAndUpdate(req.params.id, update, {new: true, runValidators: true});
        });
    });
};

Profile.update = function(req){
  if(req.files && req.files[0])
    return Profile.updateProfileWithPhoto(req);
  let options = {new: true, runValidators: true};
  return Profile.findByIdAndUpdate(req.params.id, req.body, options);
};

Profile.delete = function(req){
  return Profile.findOneAndRemove({_id: req.params.id})
    .then(profile => {
      if(!profile)
        throw createError(404, 'NOT FOUND ERROR: profile not found');
      if(!profile.avatar) return;
      else
        return util.s3DeletePhotoFromURL(profile.avatar);
    });
};

export default Profile;
