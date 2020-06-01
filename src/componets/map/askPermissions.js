import {PermissionsAndroid} from 'react-native';
import {
  GIVE_GPS_PERMISSIONS,
  GIVE_GPS_PERMISSIONS_DETAILED,
  GPS_PERMS_ACCESS_COARSE,
  GPS_PERMS_ACCESS_FINE,
} from '../../constants/constants';

const askPermissions = () =>
  new Promise(resolve => {
    PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
      {
        title: GIVE_GPS_PERMISSIONS,
        message: GIVE_GPS_PERMISSIONS_DETAILED,
      },
    )
      .then(granted =>
        granted[GPS_PERMS_ACCESS_COARSE] === 'granted' && granted[GPS_PERMS_ACCESS_FINE] === 'granted'
          ? resolve(true)
          : resolve(false),
      )
      .catch(_ => {});
  });

export default askPermissions;
