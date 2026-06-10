import { expect, APIResponse } from '@playwright/test';
import { HTTP_STATUS } from '../utils/constants';

export async function parseJsonResponse(response: APIResponse) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`
Response is not valid JSON.
Status: ${response.status()}
Body: ${text}
`);
  }
}

export function extractToken(body: any): string | undefined {
  const token =
    body?.token ||
    body?.access_token ||
    body?.accessToken ||
    body?.data?.token ||
    body?.data?.access_token ||
    body?.data?.accessToken ||
    body?.data?.authorization?.token ||
    body?.data?.authorization?.access_token;

  if (!token) return undefined;

  return String(token).replace(/^Bearer\s+/i, '');
}

export function extractUserUuid(body: any): string | undefined {
  return (
    body?.user_uuid ||
    body?.uuid ||
    body?.data?.user_uuid ||
    body?.data?.uuid ||
    body?.data?.user?.uuid ||
    body?.user?.uuid
  );
}

export async function expectSuccessResponse(response: APIResponse) {
  const body = await parseJsonResponse(response);

  expect(
    response.status(),
    `Expected success response but got ${response.status()} with body: ${JSON.stringify(body)}`
  ).toBe(HTTP_STATUS.OK);

  return body;
}

export async function expectLoginFailureResponse(response: APIResponse) {
  const body = await parseJsonResponse(response);

  expect(
    [
      HTTP_STATUS.BAD_REQUEST,
      HTTP_STATUS.UNAUTHORIZED,
      HTTP_STATUS.FORBIDDEN,
      HTTP_STATUS.VALIDATION_ERROR,
    ],
    `Unexpected status ${response.status()} with body: ${JSON.stringify(body)}`
  ).toContain(response.status());

  return body;
}

export async function expectPossibleFailureResponse(response: APIResponse) {
  const body = await parseJsonResponse(response);

  expect(
    [
      HTTP_STATUS.BAD_REQUEST,
      HTTP_STATUS.UNAUTHORIZED,
      HTTP_STATUS.FORBIDDEN,
      HTTP_STATUS.NOT_FOUND,
      HTTP_STATUS.VALIDATION_ERROR,
    ],
    `Expected failure response but got ${response.status()} with body: ${JSON.stringify(body)}`
  ).toContain(response.status());

  return body;
}

export function expectToken(token?: string) {
  expect(token, 'Token should be available in login response').toBeTruthy();
}