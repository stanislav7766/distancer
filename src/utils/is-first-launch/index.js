import {getItem, setItem} from '~/utils/fs/asyncStorage';
import {HAS_LAUNCHED} from '~/constants/constants';

export const IsFirstLaunch = async () => {
  try {
    const hasLaunched = await getItem(HAS_LAUNCHED);
    if (!hasLaunched) {
      setItem(HAS_LAUNCHED, 'true');
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
