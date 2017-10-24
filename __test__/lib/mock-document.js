import faker from 'faker';
import * as _ from 'ramda';
import Doc from '../../src/model/doc.js';
import {mockProfile} from './mock-profile.js';

export const mockDoc = () => {
  return mockProfile()
  .then(({profile, userData}) => {
    return new Doc({
      url: faker.image.imageUrl(),
      description: faker.company.bsBuzz(10),
      profile: profile._id,
      owner: userData.user._id,
      tags: faker.company.bzBuzz(2),
    })
    .save()
    .then(doc => ({doc, profile, userData}));
  });
};

export const mockSomeDocs = (count=100) => {
  return Promise.all(_.map(() => mockDoc(), Array(count)))
  .then(docData => {
    return _.reduce((result, next) => {
      return {...result, [next.doc._id]: next}}, {}, docData);
  });
};
