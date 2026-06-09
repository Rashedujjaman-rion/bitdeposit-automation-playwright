import { APIRequestContext, expect } from '@playwright/test';
import { ENV } from '../utils/env';
import { API_ENDPOINTS, HTTP_STATUS } from '../utils/constants';
import geodata from '../data/geodata.json';

export async function loginByApi(api: APIRequestContext) {
  const response = await api.post(API_ENDPOINTS.LOGIN, {
    params: {
      identifier: ENV.USER_IDENTIFIER,
      password: ENV.USER_PASSWORD,
      type: ENV.LOGIN_TYPE,
      reg_from: ENV.REG_FROM,
      remember_me: ENV.REMEMBER_ME,
    },
    data: {
      geodata: JSON.stringify(geodata),
      web_device_info: 'string',
    },
  });

  console.log('Login Status:', response.status());
  console.log('Login Response:', await response.text());

  expect(response.status()).toBe(HTTP_STATUS.OK);

  const body = await response.json();

  const token =
  body.token ||
  body.access_token ||
  body.accessToken ||
  body.data?.token ||
  body.data?.access_token ||
  body.data?.accessToken ||
  body.data?.authorization?.token;

// console.log('Login Token:', token);
  return {
    response,
    body,
    token,
  };
}