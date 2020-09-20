import {getItem, setItem} from '../../utils/asyncStorage';
import {HAS_LAUNCHED} from '../../constants/constants';

export default async function IsFirstLaunch() {
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
}
