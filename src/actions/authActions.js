import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {FIREBASE_CODES} from '../firebase/constants';
import {
  ERROR_OCCURRED,
  WEB_CLIENT_ID,
  ERROR_NETWORK_FAILED,
  USER_NOT_FOUND,
  EMAIL_ALREADY_USED,
} from '../constants/constants';
import {isNetworkAvailable} from '../utils/NetworkUtils';
import {setItem, getItem, removeItem, updateItem} from '../utils/asyncStorage';
import {GoogleSignin} from '@react-native-community/google-signin';
import {isFilledArr} from '../utils/isFilledArr';
import {validateData} from '../utils/validation/validation';
GoogleSignin.configure({
  offlineAccess: false,
  webClientId: WEB_CLIENT_ID,
});

const isSignedGoogle = async () => {
  return await GoogleSignin.isSignedIn();
};

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
  return !isNewUser ? {success: false, reason: EMAIL_ALREADY_USED} : {success: true, data: {profile, user}};
};

const _signInWithGoogleCredential = async () => {
  const {
    idToken,
    user: {email},
  } = await _signWithGoogle();

  const exist = await _checkUserExistByEmail(email);
  if (!exist) {
    return {success: false, reason: USER_NOT_FOUND};
  }
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  const {user} = await auth().signInWithCredential(googleCredential);
  return {success: true, data: {user}};
};

const _saveProfile = async (uid, profile) =>
  Promise.all([firestore().collection('users').doc(uid).set(profile), setItem(uid, profile)]);

export const updateProfile = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) {
        return resolve({success: false, reason: ERROR_NETWORK_FAILED});
      }
      const {profile} = payload;
      const {isValid, reason} = validateData(profile);
      if (!isValid) {
        return resolve({success: false, reason});
      }
      const {userId, ...restProfile} = profile;
      await Promise.all([
        firestore().collection('users').doc(userId).update(restProfile),
        updateItem(userId, restProfile),
      ]);
      resolve({success: true});
    } catch (err) {
      reject(err);
    }
  });

export const loginWithGoogle = () =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) {
        return resolve({success: false, reason: ERROR_NETWORK_FAILED});
      }
      const {success, reason, data} = await _signInWithGoogleCredential();
      if (!success) {
        return resolve({success: false, reason});
      }
      const {
        user: {uid},
      } = data;

      const doc = await firestore().collection('users').doc(uid).get();

      doc.exists
        ? resolve({success: true, reason: '', data: {user: {...doc.data(), userId: uid}}})
        : resolve({success: false, reason: USER_NOT_FOUND});
      doc.exists && (await setItem(uid, doc.data()));
    } catch (err) {
      reject(err.message);
    }
  });

export const registerWithGoogle = () =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) {
        return resolve({success: false, reason: ERROR_NETWORK_FAILED});
      }
      const {success, reason, data} = await _signUpWithGoogleCredential();
      if (!success) {
        resolve({success: false, reason});
      }
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
      resolve({success: true, reason: '', data: {user: userProfile}});
      await _saveProfile(uid, userProfile);
    } catch (err) {
      reject(err.message);
    }
  });

export const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    try {
      auth().onAuthStateChanged(async user => {
        if (!user) {
          return resolve({success: false, reason: '', data: {user: null}});
        }
        const {uid} = user;
        const doc = await firestore().collection('users').doc(uid).get();
        const data = doc.exists ? doc.data() : await getItem(uid);
        resolve({success: true, reason: '', data: {user: data}});
      });
    } catch (err) {
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code) ? FIREBASE_CODES[code] : ERROR_OCCURRED;
      reject({success: false, reason: mes});
    }
  });

export const registerUser = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) {
        return resolve({success: false, reason: ERROR_NETWORK_FAILED});
      }
      const {
        data: {email, password},
      } = payload;
      const {isValid, reason} = validateData({email, password});
      if (!isValid) {
        return resolve({success: false, reason});
      }
      const response = await auth().createUserWithEmailAndPassword(email, password);
      const {uid} = response.user;
      const profile = {
        userId: uid,
        email,
      };
      resolve({success: true, reason: '', data: {user: profile}});
      await _saveProfile(uid, profile);
    } catch (err) {
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code) ? FIREBASE_CODES[code] : ERROR_OCCURRED;
      reject(mes);
    }
  });

export const loginUser = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) {
        return resolve({success: false, reason: ERROR_NETWORK_FAILED});
      }
      const {
        data: {email, password},
      } = payload;
      const {isValid, reason} = validateData({email, password});
      if (!isValid) {
        return resolve({success: false, reason});
      }
      const response = await auth().signInWithEmailAndPassword(email, password);
      const {uid} = response.user;
      const doc = await firestore().collection('users').doc(uid).get();

      doc.exists
        ? resolve({success: true, reason: '', data: {user: {...doc.data(), userId: uid}}})
        : resolve({success: false, reason: USER_NOT_FOUND});
      doc.exists && (await setItem(uid, doc.data()));
    } catch (err) {
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code) ? FIREBASE_CODES[code] : ERROR_OCCURRED;
      reject(mes);
    }
  });

export const deleteAccount = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) {
        return resolve({success: false, reason: ERROR_NETWORK_FAILED});
      }

      const {userId} = payload;
      const isSignedIn = await isSignedGoogle();
      isSignedIn && (await _signOutGoogle());
      await Promise.all([
        auth().currentUser.delete(),
        firestore().collection('users').doc(userId).delete(),
        deleteIfExist({directionsMode: 'walking', userId}),
        deleteIfExist({directionsMode: 'cycling', userId}),
        deleteIfExist({directionsMode: 'driving', userId}),
        removeItem(userId),
      ]);
      resolve({success: true, reason: ''});
    } catch (err) {
      console.log(err);
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code) ? FIREBASE_CODES[code] : ERROR_OCCURRED;
      reject(mes);
    }
  });

export const logoutUser = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) {
        return resolve({success: false, reason: ERROR_NETWORK_FAILED});
      }

      const {userId} = payload;
      const isSignedIn = await isSignedGoogle();
      isSignedIn && (await _signOutGoogle());
      await Promise.all([auth().signOut(), removeItem(userId)]);
      resolve({success: true, reason: ''});
    } catch (err) {
      const {code} = err;
      const mes = FIREBASE_CODES.hasOwnProperty(code) ? FIREBASE_CODES[code] : ERROR_OCCURRED;
      reject(mes);
    }
  });
const getActivitiesColRef = ({userId, directionsMode}) =>
  firestore().collection('activities').doc(directionsMode).collection(userId);

const deleteIfExist = ({directionsMode, userId}) =>
  new Promise(async resolve => {
    const snapshot = await getActivitiesColRef({directionsMode, userId}).get();
    const docs = snapshot.docs;
    docs.length > 0 &&
      (await docs.forEach(doc => {
        const {id} = doc.data();
        getActivitiesColRef({userId, directionsMode}).doc(id).delete();
      }));
    resolve(true);
  });
