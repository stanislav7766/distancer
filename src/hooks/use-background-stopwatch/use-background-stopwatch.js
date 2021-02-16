import {useEffect, useState, useCallback} from 'react';
import useStopwatch from '~/hooks/use-stopwatch';
import useAppState from '~/hooks/use-app-state';
import {msTohhmmss} from '~/utils/time-helpers';

const useBackgroundStopWatch = allowStartTimer => {
  const [, isGoOutState] = useAppState();

  const {time, startWatch, resetWatch, stopWatch, statusWatch} = useStopwatch();
  const {hhmmss, ms} = time;

  const [timeChanges, setTimeChanges] = useState({
    startBg: 0,
    beforeBg: 0,
    startMS: 0,
  });

  const onStartWatch = useCallback(() => {
    if (statusWatch?.current === 'tick') return;
    startWatch();
    const startMS = new Date().getTime();
    setTimeChanges({...timeChanges, startMS});
  }, [startWatch, statusWatch, timeChanges]);

  const onContinueWatch = useCallback(() => {
    startWatch();
  }, [startWatch]);

  const onStopWatch = useCallback(() => {
    stopWatch();
  }, [stopWatch]);
  const onResetWatch = useCallback(() => {
    resetWatch();
  }, [resetWatch]);

  const onTimeWatch = useCallback(() => msTohhmmss(new Date().getTime() - timeChanges.startMS), [timeChanges.startMS]);

  const onBackground = useCallback(() => {
    if (statusWatch?.current !== 'tick') return;
    stopWatch();
    setTimeChanges({
      ...timeChanges,
      startBg: new Date().getTime(),
      beforeBg: ms,
    });
  }, [ms, statusWatch, stopWatch, timeChanges]);

  const onForeground = useCallback(() => {
    if (statusWatch?.current !== 'stop' || !allowStartTimer) return;
    const {startBg, beforeBg} = timeChanges;
    const dif = new Date().getTime() - startBg;
    startWatch(dif + beforeBg);
  }, [allowStartTimer, startWatch, statusWatch, timeChanges]);

  useEffect(() => {
    isGoOutState ? onBackground() : onForeground();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGoOutState]);

  return {
    onStartWatch,
    onContinueWatch,
    onResetWatch,
    onStopWatch,
    onTimeWatch,
    hhmmss,
  };
};

export default useBackgroundStopWatch;
