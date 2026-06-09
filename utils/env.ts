import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

export const ENV = {
  APP_ENV: process.env.APP_ENV || 'dev',

  BASE_URL: process.env.BASE_URL || '',
  API_BASE_URL: process.env.API_BASE_URL || '',

  USER_IDENTIFIER: process.env.USER_IDENTIFIER || '',
  USER_PASSWORD: process.env.USER_PASSWORD || '',
  LOGIN_TYPE: process.env.LOGIN_TYPE || 'email',
  REG_FROM: process.env.REG_FROM || 'web',
  REMEMBER_ME: process.env.REMEMBER_ME || 'false',
};