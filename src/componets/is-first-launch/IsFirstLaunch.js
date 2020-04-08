import {AsyncStorage} from 'react-native';

const HAS_LAUNCHED = 'hasLaunched';

export default async function IsFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
    if (!hasLaunched) {
      AsyncStorage.setItem(HAS_LAUNCHED, 'true');
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
