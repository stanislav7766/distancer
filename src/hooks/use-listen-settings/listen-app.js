import {useCallback} from 'react';
import Toast from 'react-native-simple-toast';
import {useAppSettings} from '~/stores/app-settings';
import {readSettings, writeSettings} from '~/utils/fs/storage';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

export const useListenApp = () => {
  const {theme, locale, defaultScreen, setAppSettings} = useAppSettings();

  const updateStorageApp = useCallback(async () => {
    try {
      const settings = await readSettings('app');
      await writeSettings({...settings, theme, defaultScreen, locale}, 'app');
    } catch (error) {
      Toast.show(papyrusify('common.message.errorOccurred'));
    }
  }, [theme, defaultScreen, locale]);

  const updateStoreApp = useCallback(async () => {
    try {
      const settings = await readSettings('app');
      setAppSettings(settings);
    } catch (error) {
      Toast.show(papyrusify('common.message.errorOccurred'));
    }
  }, [setAppSettings]);

  return [updateStoreApp, updateStorageApp];
};
