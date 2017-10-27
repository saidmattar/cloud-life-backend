import {Router} from 'express';
import Doc from '../model/doc.js';
import createError from 'http-errors';
import {bearerAuth} from '../middleware/parser-auth.js';
import parserBody from '../middleware/parser-body.js';

export default new Router()
  .post('/docs', bearerAuth, parserBody, (req, res, next) => {
    Doc.create(req)
      .then(res.json)
      .catch(next);
  })
  .get('/docs', (req, res, next) => {
    Doc.fetch(req)
      .then(res.page)
      .catch(next);
  })

  .get('/docs/:id', (req, res, next) => {
    Doc.fetchOne(req)
      .then(res.json)
      .catch(next);
  })
  .put('/docs/:id', bearerAuth, parserBody, (req, res, next) => {
    Doc.update(req)
      .then(res.json)
      .catch(next);
  })
  .delete('/docs/:id', bearerAuth, (req, res, next) => {
    Doc.delete(req)
      .then(() => res.sendStatus(204))
      .catch(next);
  });
