import {PermissionsAndroid} from 'react-native';
import {GPS_PERMS_ACCESS_COARSE, GPS_PERMS_ACCESS_FINE} from '~/constants/constants';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

export const askGpsPermissions = () =>
  new Promise(resolve => {
    PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      ],
      {
        title: papyrusify('permissions.message.giveGps'),
        message: papyrusify('permissions.message.giveGpsDetailed'),
      },
    )
      .then(granted =>
        granted[GPS_PERMS_ACCESS_COARSE] === 'granted' && granted[GPS_PERMS_ACCESS_FINE] === 'granted'
          ? resolve(true)
          : resolve(false),
      )
      .catch(_ => {});
  });
