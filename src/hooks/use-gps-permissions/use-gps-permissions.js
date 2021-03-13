import {useEffect, useCallback} from 'react';
import {BackHandler} from 'react-native';
import {askGpsPermissions} from '~/utils/ask-permissions';
import Toast from 'react-native-simple-toast';
import {getLocaleStore} from '~/stores/locale';
import {useAppState} from '~/stores/app-state';

const {papyrusify} = getLocaleStore();

const useGpsPermissions = () => {
  const {setAllowUpdate} = useAppState();

  const ask = useCallback(() => {
    setAllowUpdate(false);
    askGpsPermissions()
      .then(res => {
        if (res) {
          Toast.show(papyrusify('permissions.message.gpsGranted'));
          return;
        }
        Toast.show(papyrusify('permissions.message.gpsDenies'));
        Toast.show(papyrusify('permissions.message.gpsAllow'));
        BackHandler.exitApp();
      })
      .catch(_err => {
        Toast.show(papyrusify('common.message.errorOccurred'));
        BackHandler.exitApp();
      })
      .finally(() => {
        setAllowUpdate(true);
      });
  }, [setAllowUpdate]);

  useEffect(() => {
    const timeout = setTimeout(ask, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [ask]);
};

export default useGpsPermissions;
