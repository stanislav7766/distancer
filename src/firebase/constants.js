import {
  EMAIL_ALREADY_USED,
  WEAK_PASSWORD,
  INVALID_EMAIL,
  WRONG_PASSWORD,
  USER_NOT_FOUND,
  NO_CURRENT_USER,
} from '../constants/constants';

const FIREBASE_CODE_EMAIL_USER = 'auth/email-already-in-use';
const FIREBASE_CODE_WEAK_PASSWORD = 'auth/weak-password';
const FIREBASE_CODE_INVALID_EMAIL = 'auth/invalid-email';
const FIREBASE_CODE_USER_NOT_FOUND = 'auth/user-not-found';
const FIREBASE_CODE_WRONG_PASSWORD = 'auth/wrong-password';
const FIREBASE_CODE_NO_CURRENT_USER = 'auth/no-current-user';
export const FIREBASE_CODES = {
  [FIREBASE_CODE_EMAIL_USER]: EMAIL_ALREADY_USED,
  [FIREBASE_CODE_WEAK_PASSWORD]: WEAK_PASSWORD,
  [FIREBASE_CODE_INVALID_EMAIL]: INVALID_EMAIL,
  [FIREBASE_CODE_USER_NOT_FOUND]: USER_NOT_FOUND,
  [FIREBASE_CODE_WRONG_PASSWORD]: WRONG_PASSWORD,
  [FIREBASE_CODE_NO_CURRENT_USER]: NO_CURRENT_USER,
};