import {useCallback} from 'react';
import Toast from 'react-native-simple-toast';
import {useRouteSettings} from '~/stores/route-settings';
import {readSettings, writeSettings} from '~/utils/fs/storage';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

export const useListenRoute = () => {
  const {dragHints, setRouteSettings} = useRouteSettings();

  const updateStorageRoute = useCallback(async () => {
    try {
      const settings = await readSettings('route');
      await writeSettings({...settings, dragHints}, 'route');
    } catch (error) {
      Toast.show(papyrusify('common.message.errorOccurred'));
    }
  }, [dragHints]);

  const updateStoreRoute = useCallback(async () => {
    try {
      const settings = await readSettings('route');
      setRouteSettings(settings);
    } catch (error) {
      Toast.show(papyrusify('common.message.errorOccurred'));
    }
  }, [setRouteSettings]);
  return [updateStoreRoute, updateStorageRoute];
};
