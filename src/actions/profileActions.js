import {ERROR_OCCURRED} from '~/constants/constants';
import {getItem, setItem} from '~/utils/fs/asyncStorage';
import {getProfileFilledKey} from '~/utils/profile-helpers';
import {isNull} from '~/utils/validation/helpers';

export const markProfileFilled = ({payload}) =>
  new Promise(async (resolve, reject) => {
    const {userId, filled} = payload;
    const key = getProfileFilledKey(userId);
    try {
      await setItem(key, filled);
      resolve({success: true});
    } catch (err) {
      reject(ERROR_OCCURRED);
    }
  });

export const checkProfileFilled = ({payload}) =>
  new Promise(async (resolve, reject) => {
    const {userId} = payload;
    const key = getProfileFilledKey(userId);
    try {
      const filled = await getItem(key);
      if (isNull(filled)) {
        await setItem(key, false);
        return resolve({success: true, reason: '', data: {filled: false}});
      }
      resolve({success: true, reason: '', data: {filled}});
    } catch (err) {
      reject(ERROR_OCCURRED);
    }
  });
