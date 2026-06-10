import { test, expect, APIRequestContext } from '@playwright/test';
import { createApiClient, createAuthorizedApiClient } from '../../helpers/apiClient';
import { loginByApi } from '../../helpers/authHelper';
import { AuthApi } from '../../api/auth.api';
import { expectSuccessResponse } from '../../assertions/authAssertion';

test.describe('User Auth - Protected APIs', () => {
  let api: APIRequestContext;
  let authorizedApi: APIRequestContext;
  let authApi: AuthApi;

  test.beforeEach(async () => {
    api = await createApiClient();

    const { token } = await loginByApi(api);

    authorizedApi = await createAuthorizedApiClient(token);
    authApi = new AuthApi(authorizedApi);
  });

  test.afterEach(async () => {
    await api.dispose();
    await authorizedApi.dispose();
  });

  test('User should get details with valid token', async () => {
    const response = await authApi.getUserDetail();
    const body = await expectSuccessResponse(response);

    console.log('User detail response:', JSON.stringify(body, null, 2));

    expect(body).toBeTruthy();
  });

  test('User token should be valid', async () => {
    const response = await authApi.verifyToken();
    const body = await expectSuccessResponse(response);

    console.log('Verify token response:', JSON.stringify(body, null, 2));

    expect(body).toBeTruthy();
  });
});