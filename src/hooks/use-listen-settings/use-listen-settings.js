import {useEffect, useState, useContext, useCallback} from 'react';
import Toast from 'react-native-simple-toast';
import {themeContext} from '../../contexts/contexts';
import {AppState} from 'react-native';
import {IsFirstLaunch} from '../../utils/is-first-launch';
import {initialLoad, readSettings, writeSettings} from '../../utils/fs';
import {isGoOut} from '../../utils/isGoOut';
import {ERROR_OCCURRED} from '../../constants/constants';

const useListenSettings = () => {
  const {theme, setTheme} = useContext(themeContext);
  const [appState, setAppState] = useState(AppState.currentState);

  const updateSettings = useCallback(async () => {
    try {
      const settings = await readSettings();
      settings?.theme !== theme && (await writeSettings({...settings, theme}));
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [theme]);

  const setSettings = useCallback(async () => {
    try {
      const settings = await readSettings();
      settings?.theme !== theme && setTheme(settings.theme);
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [setTheme, theme]);

  useEffect(() => {
    (async () => {
      isGoOut(appState) && (await updateSettings());
    })();
  }, [appState, updateSettings]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    (async () => {
      const isFirstLaunch = await IsFirstLaunch();
      await (isFirstLaunch ? initialLoad() : setSettings());
    })();
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleAppStateChange = async nextAppState => setAppState(nextAppState);
};

export default useListenSettings;
