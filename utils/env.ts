import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

function stringToBoolean(value: string | undefined, defaultValue = false): boolean {
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true';
}

export const ENV = {
  APP_ENV: process.env.APP_ENV || 'dev',

  BASE_URL: process.env.BASE_URL || '',
  API_BASE_URL: process.env.API_BASE_URL || process.env.BASE_URL || '',

  USER_IDENTIFIER: process.env.USER_IDENTIFIER || '',
  USER_PASSWORD: process.env.USER_PASSWORD || '',
  LOGIN_TYPE: process.env.LOGIN_TYPE || 'email',

  REG_FROM: process.env.REG_FROM || 'web',
  REG_IP_ADDRESS: process.env.REG_IP_ADDRESS || '45.248.148.179',
  BROWSER_ID: process.env.BROWSER_ID || 'playwright-browser',
  MOBILE_DEVICE_INFO: process.env.MOBILE_DEVICE_INFO || 'playwright-api-test',
  COMPANY: process.env.COMPANY || 'bitdeposit',
  REMEMBER_ME: stringToBoolean(process.env.REMEMBER_ME, false),

  RESET_IDENTIFIER: process.env.RESET_IDENTIFIER || process.env.USER_IDENTIFIER || '',
  RESET_TYPE: process.env.RESET_TYPE || process.env.LOGIN_TYPE || 'email',
  RESET_OTP: process.env.RESET_OTP || '123456',
};