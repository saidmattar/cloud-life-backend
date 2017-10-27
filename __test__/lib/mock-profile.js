import faker from 'faker';
import * as _ from 'ramda';
import {mockUser} from './mock-user.js';
import Profile from '../../src/model/profile.js';

export const mockProfile = () => {
  return mockUser()
    .then((userData) => {
      return new Profile({
        owner: userData.user.id,
        email: userData.user.email,
        username: userData.user.username,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        alias: faker.name.jobTitle(),
        priority: faker.lorem.words(1),
        safeStatus: true,
        bio: faker.lorem.words(10),
        avatar: faker.image.image(),
      }).save()
        .then(profile => {
          userData.user.profile = profile._id;
          return userData.user.save()
            .then(() => profile);
        })
        .then(profile => ({userData, profile}));
    });
};

export const mockManyProfiles = (num=10) => {
  return Promise.all(_.map(() => mockProfile(), Array(num)));
};
