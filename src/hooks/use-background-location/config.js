import {Platform} from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const androidConfig = {
  desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
  stationaryRadius: 10,
  distanceFilter: 50,
  notificationsEnabled: false,
  debug: false,
  startOnBoot: false,
  stopOnTerminate: true,
  locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
  interval: 10000,
  fastestInterval: 5000,
  activitiesInterval: 10000,
  stopOnStillActivity: false,
};
const iosConfig = {};

export const bgConfig = Platform.select({
  android: androidConfig,
  ios: iosConfig,
});
