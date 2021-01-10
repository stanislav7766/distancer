import {useEffect, useState, useCallback} from 'react';
import Toast from 'react-native-simple-toast';
import {AppState} from 'react-native';
import {useActivitySettings} from '../../stores/activity-settings';
import {useAppSettings} from '../../stores/app-settings';
import {useRouteSettings} from '../../stores/route-settings';
import {IsFirstLaunch} from '../../utils/is-first-launch';
import {initialLoad, readSettings, writeSettings} from '../../utils/fs';
import {isGoOut} from '../../utils/isGoOut';
import {ERROR_OCCURRED} from '../../constants/constants';

const useListenSettings = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const {timerOnStart, vibrateOnStart, autoPause, setActivitySettings} = useActivitySettings();
  const {theme, defaultScreen, setAppSettings} = useAppSettings();
  const {dragHints, setRouteSettings} = useRouteSettings();

  const updateActivity = useCallback(async () => {
    try {
      const settings = await readSettings('activity');
      await writeSettings({...settings, timerOnStart, vibrateOnStart, autoPause}, 'activity');
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [timerOnStart, vibrateOnStart, autoPause]);

  const updateApp = useCallback(async () => {
    try {
      const settings = await readSettings('app');
      await writeSettings({...settings, theme, defaultScreen}, 'app');
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [theme, defaultScreen]);

  const updateRoute = useCallback(async () => {
    try {
      const settings = await readSettings('route');
      await writeSettings({...settings, dragHints}, 'route');
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [dragHints]);

  const setApp = useCallback(async () => {
    try {
      const settings = await readSettings('app');
      setAppSettings(settings);
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [setAppSettings]);

  const setRoute = useCallback(async () => {
    try {
      const settings = await readSettings('route');
      setRouteSettings(settings);
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [setRouteSettings]);

  const setActivity = useCallback(async () => {
    try {
      const settings = await readSettings('activity');
      setActivitySettings(settings);
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [setActivitySettings]);

  useEffect(() => {
    (async () => {
      isGoOut(appState) && (await updateActivity());
      isGoOut(appState) && (await updateApp());
      isGoOut(appState) && (await updateRoute());
    })();
  }, [appState, updateActivity, updateApp, updateRoute]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    (async () => {
      const isFirstLaunch = await IsFirstLaunch();
      if (isFirstLaunch) {
        await initialLoad();
        return;
      }
      await setActivity();
      await setApp();
      await setRoute();
    })();
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleAppStateChange = async nextAppState => setAppState(nextAppState);
};

export default useListenSettings;
