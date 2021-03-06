import {useEffect} from 'react';
import {Alert} from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import {bgConfig} from './config';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const callAlert = showAppSettings =>
  Alert.alert(
    papyrusify('permissions.message.requireLocationTracking'),
    papyrusify('permissions.message.questionOpenSettings'),
    [
      {text: papyrusify('permissions.button.yes'), onPress: () => showAppSettings()},
      {text: papyrusify('permissions.button.no'), onPress: () => {}, style: 'cancel'},
    ],
  );

const useBackgroundLocation = onUpdateLocation => {
  const unsubscribe = () => {
    BackgroundGeolocation.deleteAllLocations();
    BackgroundGeolocation.removeAllListeners();
  };
  const start = () => {
    BackgroundGeolocation.start();
  };
  const stop = () => {
    BackgroundGeolocation.stop();
  };
  useEffect(() => {
    BackgroundGeolocation.configure(bgConfig);

    BackgroundGeolocation.on('location', location => {
      BackgroundGeolocation.startTask(taskKey => {
        const {longitude, latitude, speed} = location;
        onUpdateLocation([longitude, latitude], speed);
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('authorization', _status => {
      _status !== BackgroundGeolocation.AUTHORIZED &&
        setTimeout(() => callAlert(BackgroundGeolocation.showAppSettings), 1000);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {start, stop};
};

export default useBackgroundLocation;
