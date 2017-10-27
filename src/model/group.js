import createError from 'http-errors';
import * as util from '../lib/util.js';
import Mongoose, {Schema} from 'mongoose';

const groupSchema = new Schema({
  owner: {type: String, unique: false},
  groupName: {type: String, required: true},
  members: {type: Array},
  description: {type: String, required: true},
  docIds: {type: Array},
});

const Group = Mongoose.model('group', groupSchema);

Group.create = function(req){
  console.log('req params=', req.params);
  console.log('req user= ',req.user);
  return new Group({
    owner: req.user._id,
    groupName: req.body.groupName,
    members: [req.user.profile],
    description: req.body.description,
  })
    .save();
};

Group.fetch = util.pagerCreate(Group);

Group.fetchOne = function(req){
  return Group.findById(req.params.id)
    .then(group => {
      if(!group)
        throw createError(404, 'NOT FOUND ERROR: group not found');
      return group;
    });
};

Group.update = function(req){
  let options = {new: true, runValidators: true};
  return Group.findById(req.params.id)
    .then(group => {
      req.body.docIds = [...group.docIds, req.body.docIds];
      req.body.members = [...group.members, req.body.members];
    })
    .then(() => Group.findByIdAndUpdate(req.params.id, req.body, options));
};

Group.delete = function(req){
  return Group.findOneAndRemove({_id: req.params.id});
};

export default Group;
