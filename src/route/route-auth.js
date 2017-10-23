import {Router} from 'express';
import User from '../model/user.js';
import parserBody from './parser-body.js';
import {basicAuth} from './parser-auth.js';
import {log, daysToMilliseconds} from '../lib/util.js';

export default new Router();
