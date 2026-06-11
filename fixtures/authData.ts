import { ENV } from '../utils/env';

function cleanParams(data: Record<string, unknown>): Record<string, string | boolean> {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined && value !== '')
  ) as Record<string, string | boolean>;
}

const geodata = {
  ip: ENV.REG_IP_ADDRESS,
  hostname: '45-248-148-179.dotinternetbd.com',
  continent_name: 'Asia',
  country_name: 'Bangladesh',
  city: 'Dhaka',
  latitude: '23.77389',
  longitude: '90.35486',
  timezone: {
    name: 'Asia/Dhaka',
    offset: 6,
  },
  device_info: {
    type: 'Desktop',
    os: 'Windows 10',
    browser: 'Chrome',
  },
};

const webDeviceInfo = {
  fingerprint: 'playwright-test-fingerprint',
  browserName: 'Chrome',
  appCodeName: 'Mozilla',
  appName: 'Netscape',
  appVersion:
    '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
  browserVersion: '132.0.0.0',
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
  vendor: 'Google Inc.',
  product: 'Gecko',
  platform: 'Win32',
  timezone: 'Asia/Dhaka',
  webdriver: false,
  colorDepth: 24,
  automation: 'playwright',
};

export const authQueryParams = {
  invalidLogin: cleanParams({
    identifier: ENV.USER_IDENTIFIER,
    password: 'wrong-password',
    type: ENV.LOGIN_TYPE,
    reg_from: ENV.REG_FROM,
    company: ENV.COMPANY,
    remember_me: false,
  }),

  forgotPasswordApply: cleanParams({
    type: ENV.RESET_TYPE,
    identifier: ENV.RESET_IDENTIFIER,
    company: ENV.COMPANY,
  }),

  forgotPasswordInvalidApply: cleanParams({
    type: ENV.RESET_TYPE,
    identifier: 'invalid-user-id',
    company: ENV.COMPANY,
  }),
};

export const authRequestBody = {
  loginDeviceInfo: {
    geodata: JSON.stringify(geodata),
    web_device_info: JSON.stringify(webDeviceInfo),
  },
};

export const resetPasswordData = {
  otp: ENV.RESET_OTP,
  originalPassword: ENV.USER_PASSWORD,
};

export function getValidLoginParams(password: string) {
  return cleanParams({
    identifier: ENV.USER_IDENTIFIER,
    password,
    type: ENV.LOGIN_TYPE,
    reg_from: ENV.REG_FROM,
    company: ENV.COMPANY,
    remember_me: ENV.REMEMBER_ME,
  });
}

