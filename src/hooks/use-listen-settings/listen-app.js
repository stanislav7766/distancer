import {useCallback} from 'react';
import Toast from 'react-native-simple-toast';
import {useAppSettings} from '~/stores/app-settings';
import {readSettings, writeSettings} from '~/utils/fs/storage';
import {ERROR_OCCURRED} from '~/constants/constants';

export const useListenApp = () => {
  const {theme, defaultScreen, setAppSettings} = useAppSettings();

  const updateStorageApp = useCallback(async () => {
    try {
      const settings = await readSettings('app');
      await writeSettings({...settings, theme, defaultScreen}, 'app');
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [theme, defaultScreen]);

  const updateStoreApp = useCallback(async () => {
    try {
      const settings = await readSettings('app');
      setAppSettings(settings);
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [setAppSettings]);

  return [updateStoreApp, updateStorageApp];
};
