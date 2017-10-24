import createError from 'http-errors';
import * as util from '../lib/util.js';
import Mongoose, {Schema} from 'mongoose';

const groupSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, required: true, unique: true, ref: 'profile'},
  groupName: {type: String, required: true},
  members: [{type: Schema.Types.ObjectId, unique: true, ref: 'profile'}],
  description: {type: String},
});

const Group = Mongoose.model('group', groupSchema);

Group.create = function(req){
  return new Group({
    owner: req.body._id,
    groupName: req.body.groupName,
    profiles: req.body.profiles,
    description: req.body.description,
  }).then(profile => {
    req.group = req.body._id;
    return req.group.save()
      .then(() => profile);
  });
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
