import {ERROR_OCCURRED} from '~/constants/constants';
import {getItem, setItem} from '~/utils/fs/asyncStorage';
import {getProfileFilledKey, validateViewedProfile} from '~/utils/profile-helpers';
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
    const {profile} = payload;
    const {userId} = profile;
    const key = getProfileFilledKey(userId);
    try {
      const validProfile = validateViewedProfile(profile);
      const filled = await getItem(key);

      if (isNull(filled)) {
        await setItem(key, validProfile);
        return resolve({success: true, reason: '', data: {filled: validProfile}});
      }
      !validProfile && (await setItem(key, false));
      resolve({success: true, reason: '', data: {filled: validProfile && filled}});
    } catch (err) {
      reject(ERROR_OCCURRED);
    }
  });
