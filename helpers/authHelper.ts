import { APIRequestContext } from '@playwright/test';
import { AuthApi } from '../api/auth.api';
import { expectSuccessResponse, extractToken, expectToken } from '../assertions/authAssertion';

export async function loginByApi(api: APIRequestContext) {
  const authApi = new AuthApi(api);

  const response = await authApi.login();
  const body = await expectSuccessResponse(response);

  const token = extractToken(body);
  expectToken(token);

  return {
    response,
    body,
    token: token as string,
  };
}