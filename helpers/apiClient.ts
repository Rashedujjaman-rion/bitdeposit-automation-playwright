import { request, APIRequestContext } from '@playwright/test';
import { ENV } from '../utils/env';

export async function createApiClient(): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: ENV.API_BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      // Playwright default user-agent অনেক সময় backend/security block করতে পারে
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',

      Origin: ENV.BASE_URL,
      Referer: `${ENV.BASE_URL}/`,
    },
  });
}

export async function createAuthorizedApiClient(token: string): Promise<APIRequestContext> {
  const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

  return await request.newContext({
    baseURL: ENV.API_BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
      Origin: ENV.BASE_URL,
      Referer: `${ENV.BASE_URL}/`,
      Authorization: bearerToken,
      'User-Authorization': bearerToken,
    },
  });
}