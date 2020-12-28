import {useEffect, useState} from 'react';
import useStopwatch from '../../componets/stopwatch/useStopwatch';
import {AppState} from 'react-native';
import {msTohhmmss} from '../../utils/timeToSec';
import {isGoOut} from '../../utils/isGoOut';

const useBackgroundStopWatch = allowStartTimer => {
  const [appState, setAppState] = useState(AppState.currentState);

  const {time, startWatch, resetWatch, stopWatch} = useStopwatch();
  const {hhmmss, ms, status: statusWatch} = time;

  const [timeChanges, setTimeChanges] = useState({
    startBg: 0,
    beforeBg: 0,
    startMS: 0,
  });

  const onStartWatch = () => {
    startWatch();
    const startMS = new Date().getTime();
    setTimeChanges({...timeChanges, startMS});
  };
  const onContinueWatch = () => {
    startWatch();
  };

  const onStopWatch = () => {
    stopWatch();
  };
  const onResetWatch = () => {
    resetWatch();
  };

  const onTimeWatch = () => {
    return msTohhmmss(new Date().getTime() - timeChanges.startMS);
  };

  const onBackground = () => {
    if (statusWatch === 'tick') {
      stopWatch();
      setTimeChanges({
        ...timeChanges,
        startBg: new Date().getTime(),
        beforeBg: ms,
      });
    }
  };

  const onForeground = () => {
    if (statusWatch === 'stop' && allowStartTimer) {
      const {startBg, beforeBg} = timeChanges;
      const dif = new Date().getTime() - startBg;
      startWatch(dif + beforeBg);
      return;
    }
  };

  useEffect(() => {
    isGoOut(appState) ? onBackground() : onForeground();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async nextAppState => setAppState(nextAppState);
  return {
    onStartWatch,
    onContinueWatch,
    onResetWatch,
    onStopWatch,
    onTimeWatch,
    hhmmss,
    statusWatch,
  };
};

export default useBackgroundStopWatch;
