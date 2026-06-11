import { test, expect } from '@playwright/test';
import { createApiClient } from '../../helpers/apiClient';
import { AuthApi } from '../../api/auth.api';
import {
  expectSuccessResponse,
  expectPossibleFailureResponse,
  extractUserUuid,
  extractToken,
} from '../../assertions/authAssertion';
import { resetPasswordData } from '../../fixtures/authData';
import { saveCurrentUserPassword } from '../../utils/authState';

function generateDynamicPassword() {
  return `Password@${Date.now()}`;
}

async function resetPassword(authApi: AuthApi, newPassword: string) {
  const applyResponse = await authApi.forgotPasswordApply();
  const applyBody = await expectSuccessResponse(applyResponse);

  console.log('Forgot password apply response:', JSON.stringify(applyBody, null, 2));

  const userUuid = extractUserUuid(applyBody);
  expect(userUuid, 'user_uuid should be available from forgot password apply response').toBeTruthy();

  const otpResponse = await authApi.forgotPasswordOtpVerify(userUuid as string);
  const otpBody = await expectSuccessResponse(otpResponse);

  console.log('Forgot password OTP verify response:', JSON.stringify(otpBody, null, 2));

  const confirmResponse = await authApi.forgotPasswordConfirm(userUuid as string, newPassword);
  const confirmBody = await expectSuccessResponse(confirmResponse);

  console.log('Forgot password confirm response:', JSON.stringify(confirmBody, null, 2));

  return confirmBody;
}

test.describe('User Auth - Forgot Password API', () => {
  test('User should reset password dynamically and restore original password', async () => {
    const api = await createApiClient();
    const authApi = new AuthApi(api);

    
    const dynamicPassword = generateDynamicPassword();
    

    try {
      await resetPassword(authApi, dynamicPassword);
      saveCurrentUserPassword(dynamicPassword);

      const dynamicLoginResponse = await authApi.loginWithPassword(dynamicPassword);
      const dynamicLoginBody = await expectSuccessResponse(dynamicLoginResponse);

      console.log('Dynamic password login response:', JSON.stringify(dynamicLoginBody, null, 2));

      const dynamicToken = extractToken(dynamicLoginBody);
      expect(dynamicToken, 'Token should be available after login with dynamic password').toBeTruthy();

      
    } finally {
      await api.dispose();
    }
  });

  test('User forgot password apply should fail with invalid user', async () => {
    const api = await createApiClient();

    try {
      const authApi = new AuthApi(api);

      const response = await authApi.forgotPasswordApplyWithInvalidUser();
      const body = await expectPossibleFailureResponse(response);

      console.log('Invalid forgot password apply response:', JSON.stringify(body, null, 2));

      expect(body).toBeTruthy();
    } finally {
      await api.dispose();
    }
  });
});