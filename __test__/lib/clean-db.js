import fs from 'fs-extra';
import User from '../../model/user.js';
import Group from '../../model/group.js';
import Doc from '../../model/doc.js';
import Profile from '../../model/profile.js';

export default () => Promise.all([
  fs.remove(`${__dirname}/../../../temp/*`),
  User.remove({}),
  Group.remove({}),
  Doc.remove({}),
  Profile.remove({}),
]);
