export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/user/login',
    VERIFY_TOKEN: '/api/v1/user/verify-token',
    SIGNOUT: '/api/v1/user/signout',

    FORGOT_PASSWORD_APPLY: '/api/v1/user/forgetpass-apply',
    FORGOT_PASSWORD_OTP_VERIFY: '/api/v1/user/forgetpass-otp-verify',
    FORGOT_PASSWORD_CONFIRM: '/api/v1/user/forgetpass-confirm',
  },

  USER: {
    DETAIL: '/api/v1/user/detail',
  },

  LOGIN: '/api/v1/user/login',
  USER_DETAIL: '/api/v1/user/detail',
  LOGOUT: '/api/v1/user/signout',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  SERVER_ERROR: 500,
};