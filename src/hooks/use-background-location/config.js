import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

export const bgConfig = {
  desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
  stationaryRadius: 5,
  distanceFilter: 5,
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
