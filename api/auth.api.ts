import { APIRequestContext } from '@playwright/test';
import { API_ENDPOINTS } from '../utils/constants';
import { authQueryParams, authRequestBody, resetPasswordData } from '../fixtures/authData';

const API_TIMEOUT = 30000;

export class AuthApi {
  constructor(private readonly api: APIRequestContext) {}

  async login() {
    return await this.api.post(API_ENDPOINTS.AUTH.LOGIN, {
      params: authQueryParams.validLogin,
      data: authRequestBody.loginDeviceInfo,
      timeout: API_TIMEOUT,
      failOnStatusCode: false,
    });
  }

  async loginWithPassword(password: string) {
    return await this.api.post(API_ENDPOINTS.AUTH.LOGIN, {
      params: {
        ...authQueryParams.validLogin,
        password,
      },
      data: authRequestBody.loginDeviceInfo,
      timeout: API_TIMEOUT,
      failOnStatusCode: false,
    });
  }

  async loginWithInvalidPassword() {
    return await this.api.post(API_ENDPOINTS.AUTH.LOGIN, {
      params: authQueryParams.invalidLogin,
      data: authRequestBody.loginDeviceInfo,
      timeout: API_TIMEOUT,
      failOnStatusCode: false,
    });
  }

  async getUserDetail() {
    return await this.api.get(API_ENDPOINTS.USER.DETAIL, {
      timeout: API_TIMEOUT,
      failOnStatusCode: false,
    });
  }

  async verifyToken() {
    return await this.api.get(API_ENDPOINTS.AUTH.VERIFY_TOKEN, {
      timeout: API_TIMEOUT,
      failOnStatusCode: false,
    });
  }

  async signout() {
    return await this.api.post(API_ENDPOINTS.AUTH.SIGNOUT, {
      data: authRequestBody.loginDeviceInfo,
      timeout: API_TIMEOUT,
      failOnStatusCode: false,
    });
  }

  async forgotPasswordApply() {
    return await this.api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD_APPLY, {
      params: authQueryParams.forgotPasswordApply,
      timeout: API_TIMEOUT,
      failOnStatusCode: false,
    });
  }

  async forgotPasswordApplyWithInvalidUser() {
    return await this.api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD_APPLY, {
      params: authQueryParams.forgotPasswordInvalidApply,
      timeout: API_TIMEOUT,
      failOnStatusCode: false,
    });
  }

  async forgotPasswordOtpVerify(userUuid: string) {
    return await this.api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD_OTP_VERIFY, {
      params: {
        user_uuid: userUuid,
        one_time_code: resetPasswordData.otp,
      },
      timeout: API_TIMEOUT,
      failOnStatusCode: false,
    });
  }

  async forgotPasswordConfirm(userUuid: string, newPassword: string) {
    return await this.api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD_CONFIRM, {
      params: {
        user_uuid: userUuid,
        password: newPassword,
        password_confirmation: newPassword,
      },
      timeout: API_TIMEOUT,
      failOnStatusCode: false,
    });
  }

  async forgotPasswordOtpVerifyWithInvalidOtp(userUuid: string) {
    return await this.api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD_OTP_VERIFY, {
      params: {
        user_uuid: userUuid,
        one_time_code: '000000',
      },
      timeout: API_TIMEOUT,
      failOnStatusCode: false,
    });
  }
}