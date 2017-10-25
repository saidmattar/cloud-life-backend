import * as _ from 'ramda';
import superagent from 'superagent';
import cleanDB from './lib/clean-db.js';
import * as server from '../src/lib/server.js';
import {mockProfile} from './lib/mock-profile.js';
import {mockDoc, mockSomeDocs} from './lib/mock-doc.js';

const API_URL = process.env.API_URL;

describe('router-doc.test.js', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(cleanDB);

  describe('POST /api/docs', () => {
    test('should create a doc', () => {
      return mockProfile()
      .then(({userData, profile}) => {
        return superagent.post(`${API_URL}/docs`)
        .set('Authorization', `Bearer ${userData.token}`)
        .attach('doc', `${__dirname}/asset/hacker.jpg`)
        .then(res => {
          expect(res.status).toEqual(200);
          profile = JSON.parse(JSON.stringify(profile));
          expect(res.body.owner).toEqual(userData.user._id.toString());
          expect(res.body.profile).toEqual(profile);
          expect(res.body.url).toBeTruthy();
          expect(res.body.description).toEqual('example data');
          expect(res.body.comments).toEqual([]);
        });
      });
    });

    test('should respond with 400', () => {
      return mockProfile()
      .then(({userData, profile}) => {
        return superagent.post(`${API_URL}/docs`)
        .set('Authorization', `Bearer ${userData.token}`)
        .field('description', 'example data')
        .then(res => {throw res})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
      });

    });

    test('should respond with 400', () => {
      return mockProfile()
      .then(({userData, profile}) => {
        return superagent.post(`${API_URL}/docs`)
        .set('Authorization', `Bearer ${userData.token}`)
        .attach('doc', `${__dirname}/asset/hacker.jpg`)
        .then(res => {throw res})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
  });

  // describe('GET /api/docs', () => {
  //   let fetchPage = (page) => {
  //     return request(`${API_URL}/docs?page=${page}`)
  //     .catch(err => err);
  //   };
  //
  //   let compareBodyWithMock = (body , mock) => {
  //     _.forEach((doc) => {
  //       let mockDoc = JSON.parse(JSON.stringify(mock[doc._id]));
  //       expect(doc._id).toEqual(mockDoc.doc._id);
  //       expect(doc.owner).toEqual(mockDoc.doc.owner);
  //       expect(doc.description).toEqual(mockDoc.doc.description);
  //       expect(doc.url).toEqual(mockDoc.doc.url);
  //       expect(doc.profile).toEqual(mockDoc.profile);
  //     })(body);
  //   };
  //
  //   test('should respond with 100 docs', () => {
  //     return mockSomeDocs()
  //     .then(docData => {
  //       return fetchPage(1)
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         expect(res.body.count).toEqual(100);
  //         expect(res.body.prev).toEqual(null);
  //         expect(res.body.next).toEqual(null);
  //         expect(res.body.last).toEqual(`${API_URL}/docs?page=1`);
  //         compareBodyWithMock(res.body.data, docData);
  //       });
  //     });
  //   });
  //
  //   test('should respond with 50 docs', () => {
  //     return mockSomeDocs(150)
  //     .then(docData => {
  //       return fetchPage(2)
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         expect(res.body.count).toEqual(150);
  //         expect(res.body.prev).toEqual(`${API_URL}/docs?page=1`);
  //         expect(res.body.next).toEqual(null);
  //         expect(res.body.last).toEqual(`${API_URL}/docs?page=2`);
  //         expect(res.body.data.length).toEqual(50);
  //         compareBodyWithMock(res.body.data, docData);
  //       });
  //     });
  //   });
  // });
  //
  // describe('GET /api/docs/:id', () => {
  //   test('should fetch a doc', () => {
  //     return mockDoc()
  //     .then(mock => {
  //       return request.get(`${API_URL}/docs/${mock.doc._id}`)
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //       });
  //     });
  //   });
  //
  //   test('should 404', () => {
  //     return mockDoc()
  //     .then(mock => {
  //       return request.get(`${API_URL}/docs/${mock.doc.owner}`)
  //       .catch(res => res)
  //       .then(res => {
  //         expect(res.status).toEqual(404);
  //       });
  //     });
  //   });
  // });
  //
  // describe('PUT /api/docs/:id', () => {
  //   test('should respond with updated doc', () => {
  //     return mockDoc()
  //     .then(mock => {
  //       return request.put(`${API_URL}/docs/${mock.doc._id}`)
  //       .set('Authorization', `Bearer ${mock.userData.token}`)
  //       .attach('doc', `${__dirname}/asset/hacker.jpg`)
  //       .field('description', 'cool beans')
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         expect(res.body._id).toEqual(mock.doc._id.toString());
  //         expect(res.body.description).toEqual('cool beans');
  //         expect(res.body.url).not.toEqual(mock.doc.url);
  //       });
  //     });
  //   });
  //
  //   test('should respond with updated doc', () => {
  //     return mockDoc()
  //     .then(mock => {
  //       return request.put(`${API_URL}/docs/${mock.doc._id}`)
  //       .set('Authorization', `Bearer ${mock.userData.token}`)
  //       .attach('doc', `${__dirname}/asset/hacker.jpg`)
  //       .attach('doc', `${__dirname}/asset/hacker.jpg`)
  //       .field('description', 'cool beans')
  //       .catch(res => res)
  //       .then(res => {
  //         expect(res.status).toEqual(400);
  //       });
  //     });
  //   });
  // });
  //
  // describe('DELETE /api/docs/:id', () => {
  //   test('should delete a doc', () => {
  //     return mockDoc()
  //     .then(mock => {
  //       return request.delete(`${API_URL}/docs/${mock.doc._id}`)
  //       .set('Authorization', `Bearer ${mock.userData.token}`)
  //       .then(res => {
  //         expect(res.status).toEqual(204);
  //       });
  //     });
  //   });
  //
  //   test('should 404', () => {
  //     return mockDoc()
  //     .then(mock => {
  //       return request.delete(`${API_URL}/photos/${mock.photo.owner}`)
  //       .set('Authorization', `Bearer ${mock.userData.token}`)
  //       .catch(res => res)
  //       .then(res => {
  //         expect(res.status).toEqual(404);
  //       });
  //     });
  //   });
  // });

});
