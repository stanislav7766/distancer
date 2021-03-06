import {useCallback} from 'react';
import Toast from 'react-native-simple-toast';
import {useActivitySettings} from '~/stores/activity-settings';
import {readSettings, writeSettings} from '~/utils/fs/storage';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

export const useListenActivity = () => {
  const {timerOnStart, vibrateOnStart, autoPause, setActivitySettings} = useActivitySettings();

  const updateStorageActivity = useCallback(async () => {
    try {
      const settings = await readSettings('activity');
      await writeSettings({...settings, timerOnStart, vibrateOnStart, autoPause}, 'activity');
    } catch (error) {
      Toast.show(papyrusify('common.message.errorOccurred'));
    }
  }, [timerOnStart, vibrateOnStart, autoPause]);

  const updateStoreActivity = useCallback(async () => {
    try {
      const settings = await readSettings('activity');
      setActivitySettings(settings);
    } catch (error) {
      Toast.show(papyrusify('common.message.errorOccurred'));
    }
  }, [setActivitySettings]);

  return [updateStoreActivity, updateStorageActivity];
};
