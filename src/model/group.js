import createError from 'http-errors';
import * as util from '../lib/util.js';
import Mongoose, {Schema} from 'mongoose';
import Profile from './profile.js';

const groupSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, unique: false},
  groupName: {type: String},
  members: [{type: Schema.Types.ObjectId, unique: false, ref: 'profiles'}],
  description: {type: String},
  docIds: [{type: Schema.Types.ObjectId, unique: false, ref: 'docs'}],
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
  console.log('group update', req.body);
  let options = {new: true, runValidators: true};
  return Group.findById(req.params.id)
    .then(group => {
      console.log('group in group update here it is', group);
      console.log('req body people', req.body);
      // req.body.docIds = [...group.docIds, req.body.docIds];
      group.members = [...group.members, req.body._id];
      return group.save();
      // console.log('members',members);
    })
    .then((result) => Group.findByIdAndUpdate(req.params.id, result, options));
};

Group.delete = function(req){
  return Group.findOneAndRemove({_id: req.params.id});
};

export default Group;
