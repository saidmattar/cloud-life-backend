import cors from 'cors';
import morgan from 'morgan';
import {Router} from 'express';
import cookieParser from 'cookie-parser';
import routeAuth from '../route/route-auth';
import routeDoc from '../route/route-document';
import routeGroup from '../route/route-group';
import routeProfile from '../route/route-profile';
import fourOhFour from './four-oh-four';
import errorHandler from './error-handler';
import bindResponseMethods from './bind-response-methods';

export default new Router()
.use([
  cors({
    origin: process.env.CORS_ORIGINS.split(''),
    credentials: true,
  }),
  morgan('dev'),
  cookieParser(),
  bindResponseMethods,
  routeAuth,
  routeDoc,
  routeProfile,
  routeGroup,
  fourOhFour,
  errorHandler,
]);
