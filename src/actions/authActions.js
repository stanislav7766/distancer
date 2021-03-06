import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {FIREBASE_CODES} from '../firebase/constants';
import {WEB_CLIENT_ID} from '~/constants/constants';
import {isNetworkAvailable} from '~/utils/network-helpers';
import {setItem, getItem, removeItem, updateItem} from '~/utils/fs/asyncStorage';
import {GoogleSignin} from '@react-native-community/google-signin';
import {isFilledArr} from '~/utils/validation/helpers';
import {validateData} from '~/utils/validation/validation';
import {getProfileFilledKey, mapForDBProfile, mapForStoreProfile} from '~/utils/profile-helpers';
import {deleteAllActivities} from './activityActions';
import {deleteAllTotals} from './totalsActions';
import {deleteAllRoutes} from './routeActions';
import {deleteUserAvatar, setAvatarStorage} from './storageActions';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

GoogleSignin.configure({
  offlineAccess: false,
  webClientId: WEB_CLIENT_ID,
});

const isSignedGoogle = async () => {
  return await GoogleSignin.isSignedIn();
};

const getUserDocRef = ({userId}) => firestore().collection('users').doc(userId);

const _signOutGoogle = async () => {
  await GoogleSignin.revokeAccess();
  await GoogleSignin.signOut();
};

const _checkUserExistByEmail = async email => {
  const signInMethods = await auth().fetchSignInMethodsForEmail(email);
  return isFilledArr(signInMethods);
};

const _signWithGoogle = async () => {
  const isSignedIn = await isSignedGoogle();
  isSignedIn && (await _signOutGoogle());
  await GoogleSignin.hasPlayServices();
  return await GoogleSignin.signIn();
};

const _signUpWithGoogleCredential = async () => {
  const {idToken} = await _signWithGoogle();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  const {
    additionalUserInfo: {isNewUser, profile},
    user,
  } = await auth().signInWithCredential(googleCredential);
  return !isNewUser
    ? {success: false, reason: papyrusify('sign.message.emailAlreadyUsed')}
    : {success: true, data: {profile, user}};
};

const _signInWithGoogleCredential = async () => {
  const {
    idToken,
    user: {email},
  } = await _signWithGoogle();

  const exist = await _checkUserExistByEmail(email);
  if (!exist) return {success: false, reason: papyrusify('sign.message.userNotFound')};

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  const {user} = await auth().signInWithCredential(googleCredential);
  return {success: true, data: {user}};
};

const _saveProfile = (uid, profile) => Promise.all([getUserDocRef({userId: uid}).set(profile), setItem(uid, profile)]);

const _updateProfile = (uid, profile) =>
  Promise.all([getUserDocRef({userId: uid}).update(profile), updateItem(uid, profile)]);

export const updateProfile = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {profile, avatarURI} = payload;
      const {isValid, reason} = validateData(profile);
      if (!isValid) return resolve({success: false, reason});
      const mappedProfile = mapForDBProfile(profile);
      const {userId, ...restProfile} = mappedProfile;
      const {success, data} = await setAvatarStorage({payload: {uri: avatarURI, userId}});
      const partProfile = success ? {photoURL: data.photoURL} : {};
      await _updateProfile(userId, {...restProfile, ...partProfile});
      resolve({success: true, data: {partProfile}});
    } catch (err) {
      reject(err);
    }
  });

export const loginWithGoogle = () =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {success, reason, data} = await _signInWithGoogleCredential();
      if (!success) return resolve({success: false, reason});

      const {
        user: {uid},
      } = data;

      const doc = await getUserDocRef({userId: uid}).get();
      if (!doc.exists) return resolve({success: false, reason: papyrusify('sign.message.userNotFound')});

      const profile = doc.data();
      resolve({success: true, reason: '', data: {user: {...mapForStoreProfile(profile), userId: uid}}});
      doc.exists && (await setItem(uid, profile));
    } catch (err) {
      reject(papyrusify('common.message.tryAgain'));
    }
  });

export const requestChangeEmail = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {authorized} = payload;
      if (!authorized) return resolve({success: false, reason: papyrusify('sign.message.needAuth')});

      const signed = await isSignedGoogle();
      if (signed) return resolve({success: false, reason: papyrusify('menuMode.message.noChangeEmailGAccount')});

      return resolve({success: true});
    } catch (err) {
      reject(err.message);
    }
  });

export const requestChangePassword = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {authorized} = payload;
      if (!authorized) return resolve({success: false, reason: papyrusify('sign.message.needAuth')});

      const signed = await isSignedGoogle();
      if (signed) return resolve({success: false, reason: papyrusify('menuMode.message.noChangePasswordGAccount')});

      return resolve({success: true});
    } catch (err) {
      reject(err.message);
    }
  });

export const changePassword = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {password} = payload;
      const {isValid, reason} = validateData({password});
      if (!isValid) return resolve({success: false, reason});

      const user = auth().currentUser;
      if (!user) return resolve({success: false, reason: papyrusify('sign.message.needReLogin')});

      await user.updatePassword(password);

      return resolve({success: true});
    } catch (err) {
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code)
        ? FIREBASE_CODES[code]
        : papyrusify('common.message.errorOccurred');
      reject(mes);
    }
  });

export const verifyPassword = ({payload}) =>
  new Promise(async resolve => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {password} = payload;
      const {isValid, reason} = validateData({password});
      if (!isValid) return resolve({success: false, reason});

      const user = auth().currentUser;
      if (!user) return resolve({success: false, reason: papyrusify('sign.message.needReLogin')});

      const credential = auth.EmailAuthProvider.credential(user.email, password);
      await user.reauthenticateWithCredential(credential);

      resolve({success: true});
    } catch (err) {
      const {code} = err;
      const reason = FIREBASE_CODES.hasOwnProperty(code)
        ? FIREBASE_CODES[code]
        : papyrusify('common.message.errorOccurred');
      resolve({success: false, reason});
    }
  });
export const changeEmail = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {email} = payload;
      const {isValid, reason} = validateData({email});
      if (!isValid) return resolve({success: false, reason});

      const user = auth().currentUser;
      if (!user) return resolve({success: false, reason: papyrusify('sign.message.needReLogin')});

      const {uid} = user;
      await user.updateEmail(email);
      await _updateProfile(uid, {email});

      return resolve({success: true});
    } catch (err) {
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code)
        ? FIREBASE_CODES[code]
        : papyrusify('common.message.errorOccurred');
      reject(mes);
    }
  });
export const registerWithGoogle = () =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {success, reason, data} = await _signUpWithGoogleCredential();
      if (!success) resolve({success: false, reason});

      const {profile, user} = data;
      const {email, family_name: lastName, given_name: firstName} = profile;
      const {photoURL, uid} = user;
      const userProfile = {
        email,
        lastName,
        firstName,
        photoURL,
        userId: uid,
      };
      resolve({success: true, reason: '', data: {user: mapForStoreProfile(userProfile)}});
      await _saveProfile(uid, userProfile);
    } catch (err) {
      reject(papyrusify('common.message.tryAgain'));
    }
  });

export const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    try {
      auth().onAuthStateChanged(async user => {
        if (!user) return resolve({success: false, reason: '', data: {user: null}});

        const {uid} = user;
        const doc = await getUserDocRef({userId: uid}).get();
        const data = doc.exists ? doc.data() : await getItem(uid);
        if (!data) return resolve({success: false, reason: papyrusify('sign.message.needAuth')});
        resolve({success: true, reason: '', data: {user: mapForStoreProfile(data)}});
      });
    } catch (err) {
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code)
        ? FIREBASE_CODES[code]
        : papyrusify('common.message.errorOccurred');
      reject({success: false, reason: mes});
    }
  });

export const registerUser = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {
        data: {email, password},
      } = payload;
      const {isValid, reason} = validateData({email, password});
      if (!isValid) return resolve({success: false, reason});

      const response = await auth().createUserWithEmailAndPassword(email, password);
      const {uid} = response.user;
      const profile = {
        userId: uid,
        email,
      };
      resolve({success: true, reason: '', data: {user: mapForStoreProfile(profile)}});
      await _saveProfile(uid, profile);
    } catch (err) {
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code)
        ? FIREBASE_CODES[code]
        : papyrusify('common.message.errorOccurred');
      reject(mes);
    }
  });

export const loginUser = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {
        data: {email, password},
      } = payload;
      const {isValid, reason} = validateData({email, password});
      if (!isValid) return resolve({success: false, reason});

      const response = await auth().signInWithEmailAndPassword(email, password);
      const {uid} = response.user;
      const doc = await getUserDocRef({userId: uid}).get();

      if (!doc.exists) return resolve({success: false, reason: papyrusify('sign.message.userNotFound')});
      const profile = doc.data();
      resolve({success: true, reason: '', data: {user: {...mapForStoreProfile(profile), userId: uid}}});

      doc.exists && (await setItem(uid, profile));
    } catch (err) {
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code)
        ? FIREBASE_CODES[code]
        : papyrusify('common.message.errorOccurred');
      reject(mes);
    }
  });

export const deleteUserProfile = ({userId}) =>
  new Promise(async resolve => {
    await Promise.all([getUserDocRef({userId}).delete(), removeItem(userId), removeItem(getProfileFilledKey(userId))]);

    resolve(true);
  });

export const deleteAccount = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {userId} = payload;
      const isSignedIn = await isSignedGoogle();
      isSignedIn && (await _signOutGoogle());

      await Promise.all([
        deleteUserAvatar({userId}),
        deleteAllActivities({userId}),
        deleteAllTotals({userId}),
        deleteAllRoutes({userId}),
        deleteUserProfile({userId}),
      ]);
      await auth().currentUser.delete();
      resolve({success: true, reason: ''});
    } catch (err) {
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code)
        ? FIREBASE_CODES[code]
        : papyrusify('common.message.errorOccurred');
      reject(mes);
    }
  });

export const logoutUser = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {userId} = payload;
      const isSignedIn = await isSignedGoogle();
      isSignedIn && (await _signOutGoogle());
      await Promise.all([auth().signOut(), removeItem(userId)]);
      resolve({success: true, reason: ''});
    } catch (err) {
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code)
        ? FIREBASE_CODES[code]
        : papyrusify('common.message.errorOccurred');
      reject(mes);
    }
  });
