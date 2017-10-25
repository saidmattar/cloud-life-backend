import cors from 'cors';
import morgan from 'morgan';
import {Router} from 'express';
import cookieParser from 'cookie-parser';
import fourOhFour from './four-oh-four';
import errorHandler from './error-handler';
import bindResponseMethods from './bind-response-methods';
import routeAuth from '../route/route-auth';
import routeDoc from '../route/route-doc';
import routeGroup from '../route/route-group';
import routeProfile from '../route/route-profile';

const corsOrigins = process.env.CORS_ORIGINS || 'https://cloud-life-frontend-staging.herokuapp.com/';

export default new Router()
  .use([
    cors({
      origin: corsOrigins,
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
