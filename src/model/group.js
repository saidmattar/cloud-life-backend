import createError from 'http-errors';
import * as util from '../lib/util.js';
import Mongoose, {Schema} from 'mongoose';
import Profile from './profile.js';

const groupSchema = new Schema({
  // owner: {type: Schema.Types.ObjectId, required: true, unique: true, ref: 'profile'},
  groupName: {type: String, required: true},
  members: [{type: Schema.Types.ObjectId, unique: false, ref: 'profile'}],
  description: {type: String},
});

const Group = Mongoose.model('group', groupSchema);

Group.create = function(req){
  console.log('req params=', req.params);
  console.log('req user= ',req.user);
  return new Group({
    groupName: req.body.groupName,
    members: [...req.body.members, req.user.profile],
    description: req.body.description,
  })
    .save();
  // .then(group => {
  //   console.log('break 2');
  //   req = {
  //     params: {
  //       id: group._id,
  //     },
  //     body: {
  //       groups: group._id,
  //     },
  //   };
  //   Profile.update(req);
    // req.profile.groups = [...req.profile.groups, group._id];
    // return req.profile.save();
  // });
  // .then(() => console.log(req.body));
};

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
  return Group.findByIdAndUpdate(req.params.id, {description: req.body.description, profiles: req.body.profiles, groupName: req.body.groupName}, options);
};

Group.delete = function(req){
  return Group.findOneAndRemove({_id: req.params.id, owner: req.user._id});
};

export default Group;
