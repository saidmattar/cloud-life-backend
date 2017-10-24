'use strict';

import * as db from '../lib/db.js';
import {compare} from 'bcrypt';
import User from '../model/user.js';
import mockInvalidUser from '../lib/mock-invalid-user.js';
import {mockUser} from '../lib/mock-user.js';

describe('USER', () => {
  beforeAll(() => db.start());
  afterAll(db.stop);
  afterEach(() => User.remove({}));

  describe('Valid Mock User tests', () => {
    test('should have a valid password, user, and token', () => {
      return mockUser()
      .then(({password, user, token}) => {
        expect(token).toBeTruthy();
        expect(password).toBeTruthy();
        expect(user).toBeTruthy();
      });
    });
  });

//NOT SURE IF THIS WORKS
  describe('Invalid Mock User tests', () => {
    test('null for any of password/user/token should not work', () => {
      return mockInvalidUser()
      .then(({password, user, token}) => {
        expect(password).toBeFalsy();
        expect(token).toBeFalsy();
        expect(user).toBeFalsy();
      });
    });
  });
});
