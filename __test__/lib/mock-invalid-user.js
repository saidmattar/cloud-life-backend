jest.mock();

'use strict';

import User from '../../src/model/user.js';

export const mockInvalidUser = () => {
  let result = { password: null };
  return User.create({
    username: null,
    email: null,
    password: null,
    randomHash: null,
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
