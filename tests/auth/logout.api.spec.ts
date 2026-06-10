import { test, expect } from '@playwright/test';
import { createApiClient, createAuthorizedApiClient } from '../../helpers/apiClient';
import { loginByApi } from '../../helpers/authHelper';
import { AuthApi } from '../../api/auth.api';
import { expectSuccessResponse } from '../../assertions/authAssertion';

test.describe('User Auth - Signout API', () => {
  test('User should signout successfully', async () => {
    const api = await createApiClient();
    const { token } = await loginByApi(api);

    const authorizedApi = await createAuthorizedApiClient(token);
    const authApi = new AuthApi(authorizedApi);

    const response = await authApi.signout();
    const body = await expectSuccessResponse(response);

    console.log('Signout response:', JSON.stringify(body, null, 2));

    expect(body).toBeTruthy();

    await api.dispose();
    await authorizedApi.dispose();
  });
});