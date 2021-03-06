import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {askGpsPermissions} from '~/utils/ask-permissions';
import Toast from 'react-native-simple-toast';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const useGpsPermissions = () => {
  useEffect(() => {
    askGpsPermissions().then(
      res => {
        if (res) {
          Toast.show(papyrusify('permissions.message.gpsGranted'));
          return;
        }
        Toast.show(papyrusify('permissions.message.gpsDenies'));
        Toast.show(papyrusify('permissions.message.gpsAllow'));
        BackHandler.exitApp();
      },
      _err => {
        Toast.show(papyrusify('common.message.errorOccurred'));
        BackHandler.exitApp();
      },
    );
  }, []);
};

export default useGpsPermissions;
