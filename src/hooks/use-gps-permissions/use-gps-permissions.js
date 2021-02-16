import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {askGpsPermissions} from '~/utils/ask-permissions';
import Toast from 'react-native-simple-toast';
import {
  ERROR_OCCURRED,
  GPS_ALLOW_PERMISSIONS,
  GPS_PERMISSIONS_DENIED,
  GPS_PERMISSIONS_GRANTED,
} from '~/constants/constants';

const useGpsPermissions = () => {
  useEffect(() => {
    askGpsPermissions().then(
      res => {
        if (res) {
          Toast.show(GPS_PERMISSIONS_GRANTED);
          return;
        }
        Toast.show(GPS_PERMISSIONS_DENIED);
        Toast.show(GPS_ALLOW_PERMISSIONS);
        BackHandler.exitApp();
      },
      _err => {
        Toast.show(ERROR_OCCURRED);
        BackHandler.exitApp();
      },
    );
  }, []);
};

export default useGpsPermissions;
