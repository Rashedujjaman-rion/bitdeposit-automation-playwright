import fs from 'fs';
import path from 'path';
import { ENV } from './env';

const authStatePath = path.resolve(process.cwd(), 'data', 'auth-state.json');

type AuthState = {
  currentPassword?: string;
};

function ensureDataFolderExists() {
  const dataDir = path.dirname(authStatePath);

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export function getCurrentUserPassword(): string {
  try {
    if (!fs.existsSync(authStatePath)) {
      console.log('Auth state not found. Using .env password');
      return ENV.USER_PASSWORD;
    }

    const rawData = fs.readFileSync(authStatePath, 'utf-8');
    const state = JSON.parse(rawData) as AuthState;

    const currentPassword = state.currentPassword || ENV.USER_PASSWORD;

    console.log('Using current password from auth-state.json');

    return currentPassword;
  } catch {
    console.log('Auth state read failed. Using .env password');
    return ENV.USER_PASSWORD;
  }
}

export function saveCurrentUserPassword(password: string) {
  ensureDataFolderExists();

  const state: AuthState = {
    currentPassword: password,
  };

  fs.writeFileSync(authStatePath, JSON.stringify(state, null, 2));

  console.log(`Current password saved in auth-state.json`);
}