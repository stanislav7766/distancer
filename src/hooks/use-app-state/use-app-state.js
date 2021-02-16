import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

const isGoOut = appState => appState === 'background' || appState === 'inactive';

const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => setAppState(nextAppState);
  return [appState, isGoOut(appState)];
};

export default useAppState;
