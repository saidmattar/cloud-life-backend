'use strict';

import User from '../../model/user.js';

export const mockInvalidUser = () => {
  let result = { password: null };
  return User.create({
    username: null,
    email: '',
    password: null,
    randomHash: '',
  })
  .then(user => {
    result.user = user;
    return user.tokenCreate();
  })
  .then(token => {
    result.token = token;
    return result;
  });
};
