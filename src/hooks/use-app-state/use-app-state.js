import {useEffect, useCallback} from 'react';
import {AppState} from 'react-native';

const useAppState = appStateStore => {
  const {setAppState} = appStateStore;

  const handleAppState = useCallback(
    state => {
      setAppState(state);
    },
    [setAppState],
  );

  useEffect(() => {
    AppState.addEventListener('change', handleAppState);
    return () => {
      AppState.removeEventListener('change', handleAppState);
    };
  }, [handleAppState]);

  return null;
};

export default useAppState;
