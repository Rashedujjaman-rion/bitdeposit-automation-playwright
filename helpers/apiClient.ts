import { request, APIRequestContext } from '@playwright/test';
import { ENV } from '../utils/env';

export async function createApiClient(): Promise<APIRequestContext> {
  console.log('API_BASE_URL:', ENV.API_BASE_URL);

  return await request.newContext({
    baseURL: ENV.API_BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export async function createAuthorizedApiClient(
  token: string
): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: ENV.API_BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}