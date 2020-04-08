import {PermissionsAndroid} from 'react-native';

const askPermissions = () =>
  new Promise(resolve => {
    PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
      {
        title: 'Give Location Permission',
        message: 'App needs location permission to find your position.',
      },
    )
      .then(granted =>
        granted['android.permission.ACCESS_COARSE_LOCATION'] === 'granted' &&
        granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
          ? resolve(true)
          : resolve(false),
      )
      .catch(_ => {});
  });

export default askPermissions;
