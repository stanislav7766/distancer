import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const FIREBASE_CODE_EMAIL_USER = 'auth/email-already-in-use';
const FIREBASE_CODE_WEAK_PASSWORD = 'auth/weak-password';
const FIREBASE_CODE_INVALID_EMAIL = 'auth/invalid-email';
const FIREBASE_CODE_USER_NOT_FOUND = 'auth/user-not-found';
const FIREBASE_CODE_WRONG_PASSWORD = 'auth/wrong-password';
const FIREBASE_CODE_NEED_RE_LOGIN = 'auth/requires-recent-login';
const FIREBASE_CODE_NO_CURRENT_USER = 'auth/no-current-user';
export const FIREBASE_CODE_STORAGE_NOT_FOUND = 'storage/object-not-found';

export const FIREBASE_CODES = {
  [FIREBASE_CODE_EMAIL_USER]: papyrusify('sign.message.emailAlreadyUsed'),
  [FIREBASE_CODE_WEAK_PASSWORD]: papyrusify('validation.message.weakPassword'),
  [FIREBASE_CODE_INVALID_EMAIL]: papyrusify('validation.message.invalidEmail'),
  [FIREBASE_CODE_USER_NOT_FOUND]: papyrusify('sign.message.userNotFound'),
  [FIREBASE_CODE_WRONG_PASSWORD]: papyrusify('validation.message.passwordWrong'),
  [FIREBASE_CODE_NO_CURRENT_USER]: papyrusify('sign.message.noCurrentUser'),
  [FIREBASE_CODE_NEED_RE_LOGIN]: papyrusify('sign.message.needReLogin'),
  [FIREBASE_CODE_STORAGE_NOT_FOUND]: '',
};
// firestore/unknown
