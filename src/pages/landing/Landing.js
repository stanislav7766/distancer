import React, {useEffect, useState, useContext, Fragment} from 'react';
import {AppState} from 'react-native';
import {themeContext} from '../../contexts/contexts';
import Toast from 'react-native-simple-toast';
import Map from '../../componets/map/Map';
import Modal from '../../componets/modal/Modal';
import IsFirstLaunch from '../../componets/is-first-launch/IsFirstLaunch';
import {initialLoad, readSettings, writeSettings} from '../../utils/fs';
import {ERROR_OCCURRED} from '../../constants/constants';

const isGoOut = appState => appState === 'background' || appState === 'inactive';

const Landing = () => {
  const {theme, setTheme} = useContext(themeContext);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    (async () => {
      if (isGoOut(appState)) {
        try {
          const settings = await readSettings();
          settings.theme && settings.theme !== theme && (await writeSettings({...settings, theme}));
        } catch (error) {
          Toast.show(ERROR_OCCURRED);
        }
      }
    })();
  }, [appState, theme]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    const fetchInitialSettings = async () => {
      try {
        const isFirstLaunch = await IsFirstLaunch();
        if (isFirstLaunch) {
          await initialLoad();
        } else {
          const {theme: _theme} = await readSettings();
          _theme && _theme !== theme && setTheme(_theme);
        }
      } catch (error) {
        Toast.show(ERROR_OCCURRED);
      }
    };
    fetchInitialSettings();
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleAppStateChange = async nextAppState => setAppState(nextAppState);

  return (
    <Fragment>
      <Map />
      <Modal />
    </Fragment>
  );
};

export default Landing;
