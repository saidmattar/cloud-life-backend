import fs from 'fs-extra';
import User from '../../src/model/user.js';
import Group from '../../src/model/group.js';
import Doc from '../../src/model/doc.js';
import Profile from '../../src/model/profile.js';

export default () => Promise.all([
  fs.remove(`${__dirname}/../../../temp/*`),
  User.remove({}),
  Group.remove({}),
  Doc.remove({}),
  Profile.remove({}),
]);
