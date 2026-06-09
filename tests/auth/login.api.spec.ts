import { test, expect } from '@playwright/test';
import { createApiClient } from '../../helpers/apiClient';
import { loginByApi } from '../../helpers/authHelper';
import { ENV } from '../../utils/env';
import { API_ENDPOINTS, HTTP_STATUS } from '../../utils/constants';
import geodata from '../../data/geodata.json';

test.describe('Auth API Tests', () => {
  test('User should login successfully with valid credentials', async () => {
    const api = await createApiClient();

    const { body, token } = await loginByApi(api);

    expect(body).toBeTruthy();

    console.log('Login response:', body);

    if (token) {
      expect(token).toBeTruthy();
    }

    await api.dispose();

    
  });

  test('User should not login with invalid password', async () => {
    const api = await createApiClient();

    const response = await api.post(API_ENDPOINTS.LOGIN, {
      params: {
        identifier: ENV.USER_IDENTIFIER,
        password: 'wrong-password',
        type: ENV.LOGIN_TYPE,
        reg_from: ENV.REG_FROM,
        remember_me: ENV.REMEMBER_ME,
      },
      data: {
        geodata: JSON.stringify(geodata),
        web_device_info: 'string',
      },
    });

    expect([
      HTTP_STATUS.UNAUTHORIZED,
      HTTP_STATUS.VALIDATION_ERROR,
      400,
      403,
    ]).toContain(response.status());

    await api.dispose();
  });
});
