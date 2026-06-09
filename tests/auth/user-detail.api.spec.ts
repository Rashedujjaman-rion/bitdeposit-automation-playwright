import { test, expect } from '@playwright/test';
import { createApiClient, createAuthorizedApiClient } from '../../helpers/apiClient';
import { loginByApi } from '../../helpers/authHelper';
import { API_ENDPOINTS, HTTP_STATUS } from '../../utils/constants';

test.describe('User Detail API Tests', () => {
  test('User should get detail using login token', async () => {
    const api = await createApiClient();

    const { token } = await loginByApi(api);

    const authApi = await createAuthorizedApiClient(token);

    const response = await authApi.get(API_ENDPOINTS.USER_DETAIL);

    const text = await response.text();

    console.log('User Detail Status:', response.status());
    console.log('User Detail Response:', text);

    expect(response.status()).toBe(HTTP_STATUS.OK);

    const body = JSON.parse(text);

    expect(body).toBeTruthy();

    await api.dispose();
    await authApi.dispose();
  });
});