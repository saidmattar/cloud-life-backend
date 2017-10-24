import {Router} from 'express';
import {bearerAuth} from '../middleware/parser-auth.js';
import parserBody from '../middleware/parser-body.js';
import Group from '../model/group.js';

export default new Router()
  .post('/group', bearerAuth, parserBody, (req, res, next) => {
    Group.create(req)
      .then(res.json)
      .catch(next);
  })
  .get('/group', (req, res, next) => {
    Group.fetch(req)
      .then(res.page)
      .catch(next);
  })
  .get('/group/me', bearerAuth, (req, res, next) => {
    Group.fetch(req, {owner: req.user._id})
      .then(res.page)
      .catch(next);
  })
  .get('/group/:id', (req, res, next) => {
    Group.fetchOne(req)
      .then(res.json)
      .catch(next);
  })
  .put('/group/:id', bearerAuth, parserBody, (req, res, next) => {
    Group.update(req)
      .then(res.json)
      .catch(next);
  })
  .delete('/group/:id', bearerAuth, (req, res, next) => {
    Group.delete(req)
      .then(() => res.sendStatus(204))
      .catch(next);
  });
