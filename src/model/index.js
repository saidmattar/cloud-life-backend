import Doc from './document.js';
import Group from './group.js';
import User from './user.js';
import Profile from './profile.js';

export default (db) => {
  User(db);
  Doc(db);
  Group(db);
  Profile(db);
};
