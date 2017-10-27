'use strict';

import * as db from '../../src/lib/db.js';
import {compare} from 'bcrypt';
import User from '../../src/model/user.js';
import Profile from '../../src/model/profile.js';
// import mockInvalidUser from '../lib/mock-invalid-user.js';
import {mockUser} from '../lib/mock-user.js';
import {mockProfile} from '../lib/mock-profile';
import bodyParser from 'body-parser';
import superagent from 'superagent';

const API_URL = process.env.API_URL;

let tempUser;

describe('PROFILE', function(){
  beforeAll(() => {
    db.start();
    mockUser().then(
      userData => {
        tempUser = userData;
      }
    );
  });
  afterAll(() => {
    Profile.remove({});
    User.remove({});
    db.stop();
  });
  afterEach(() => {
    console.log('THIS TEST IS DONE');
  });

  describe('Valid Mock Profile tests', () => {
    test('should have a valid owner, email, username', () => {
      return mockProfile()
        .then(profile => {
          profile = profile.profile;
          expect(profile.owner).toBeTruthy();
          expect(profile.email).toBeTruthy();
          expect(profile.username).toBeTruthy();
        });
    });
  });


  describe('%create', () => {
    test('should not reject with valid data', () => {
      console.log('USER  = ', tempUser.token);
      let data = {
        owner: tempUser.user._id,
        firstName: 'testuser',
        lastName: 'smith',
        alias: 'da boss',
        priority: 'safe',
        safeStatus: true,
        bio: 'A little about me',
        avatar: `${__dirname}/../asset/hacker.jpg`,
      };
      console.log(data);
      expect(true).toBeTruthy();
      return superagent.post(`${API_URL}/profiles`)
        .type('application/json')
        .set('Authorization', `Bearer ${tempUser.token}`)
        .send(data)
        .then(res => {
          console.log(res);
        });
      // let parsedData = bodyParser(data).json
      //   .then(
      //     Profile.create(parsedData)
      //       .then(profile => {
      //         console.log(profile);
      //         expect(true).toBeTruthy();
            // expect(profile.passwordHash).toBeTruthy()
            // expect(profile.username).toEqual(data.username)
            // expect(profile.email).toEqual(data.email)
            // expect(profile.randomHash).toBe('')
            // }));
    });
  });
  //
  //   test('should reject with no invalid data', () => {
  //     let data = {
  //       username: 'testuser',
  //       password: 'abcd1234',
  //       email: 'testuser@example.com'
  //     }
  //
  //     return Promise.all([
  //       User.create({...data, username: undefined}).catch(err => err),
  //       User.create({...data, email: undefined}).catch(err => err),
  //       User.create({...data, password: undefined}).catch(err => err),
  //     ])
  //     .then(errors => {
  //       errors.forEach(err => {
  //         expect(err).toBeInstanceOf(Error)
  //         expect(err.status).toBe(400)
  //       })
  //     })
  //   })
  // })
  //
  // describe('#tokenCreate', () => {
  //   test('should create a new token', () => {
  //     let tokenCache
  //     return mockUser()
  //     .then(({token, user}) => {
  //       tokenCache = token
  //       return user.tokenCreate()
  //     })
  //     .then((token) => {
  //       expect(token).toBeTruthy()
  //       expect(token).not.toEqual(tokenCache)
  //     })
  //   })
  // })
  //
  // describe('#passwordCompare', () => {
  //   test('to resolve the user', () => {
  //     let userCache
  //     return mockUser()
  //     .then(({password, user}) => {
  //       userCache = user
  //       return user.passwordCompare(password)
  //     })
  //     .then((user) => {
  //       expect(user).toEqual(userCache)
  //     });
  //   });
  // });
});
