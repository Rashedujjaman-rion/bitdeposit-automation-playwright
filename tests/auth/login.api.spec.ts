import { test, expect } from '@playwright/test';
import { createApiClient } from '../../helpers/apiClient';
import { loginByApi } from '../../helpers/authHelper';
import { AuthApi } from '../../api/auth.api';
import { expectLoginFailureResponse } from '../../assertions/authAssertion';

test.describe('User Auth - Login API', () => {
  test('User should login successfully with valid credentials', async () => {
    test.setTimeout(30000);

    const api = await createApiClient();

    try {
      const { body, token } = await loginByApi(api);

      console.log('Login response:', JSON.stringify(body, null, 2));

      expect(token).toBeTruthy();
    } finally {
      await api.dispose();
    }
  });

  test('User should not login with invalid password', async () => {
    test.setTimeout(30000);

    const api = await createApiClient();

    try {
      const authApiClient = new AuthApi(api);

      const response = await authApiClient.loginWithInvalidPassword();
      const body = await expectLoginFailureResponse(response);

      console.log('Invalid login response:', JSON.stringify(body, null, 2));

      expect(body).toBeTruthy();
    } finally {
      await api.dispose();
    }
  });
});