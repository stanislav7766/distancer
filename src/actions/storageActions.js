import storage from '@react-native-firebase/storage';
import {getLocaleStore} from '~/stores/locale';
import {FIREBASE_CODE_STORAGE_NOT_FOUND} from '../firebase/constants';
import {isNetworkAvailable} from '~/utils/network-helpers';
import {isEmptyString} from '~/utils/validation/helpers';

const {papyrusify} = getLocaleStore();

const getAvatarRef = ({userId}) => storage().ref(`/avatars/${userId}/avatar.jpg`);

export const setAvatarStorage = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {uri, userId} = payload;
      if (!uri || isEmptyString(uri)) return resolve({success: false});

      await getAvatarRef({userId}).putFile(uri);
      const url = await getAvatarRef({userId}).getDownloadURL();
      resolve({success: true, data: {photoURL: url}});
    } catch (error) {
      reject(error);
    }
  });

export const deleteUserAvatar = ({userId}) =>
  new Promise(async resolve => {
    try {
      await getAvatarRef({userId}).delete();
      resolve(true);
    } catch (error) {
      if (error.code === FIREBASE_CODE_STORAGE_NOT_FOUND) {
        resolve(true);
        return;
      }
      resolve(false);
    }
  });
