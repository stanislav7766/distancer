import {useState, useRef, useEffect, useCallback} from 'react';
import {msTohhmmss} from '~/utils/time-helpers';

const useStopwatch = () => {
  const timerIdRef = useRef(null);
  const [time, setTime] = useState({ms: 0, hhmmss: '00:00:00', status: 'reset'});
  const {status: statusWatch} = time;
  const statusRef = useRef(statusWatch);

  useEffect(() => {
    statusRef.current !== statusWatch && (statusRef.current = statusWatch);
  }, [statusWatch]);

  const _startWatch = useCallback((startFromMs = 0, a = true) => {
    const resetFlag = () => (a = false);
    timerIdRef.current = setInterval(() => {
      setTime(_time => {
        const isContinue = !!(a && startFromMs !== 0);
        const updatedMs = isContinue ? startFromMs : _time.ms;
        isContinue && resetFlag();

        return {
          ms: updatedMs + 16,
          hhmmss: msTohhmmss(updatedMs),
          status: 'tick',
        };
      });
    }, 10);
  }, []);
  const startWatch = useCallback(
    (ms = 0) => {
      if (statusRef.current === 'tick') return;

      _startWatch(ms);
    },
    [_startWatch],
  );

  const stopWatch = useCallback(() => {
    if (statusRef.current === 'stop') return;

    clearInterval(timerIdRef.current);
    setTime(_time => {
      return {
        ..._time,
        status: 'stop',
      };
    });
  }, []);

  const resetWatch = useCallback(() => {
    clearInterval(timerIdRef.current);
    setTime({
      ms: 0,
      hhmmss: '00:00:00',
      status: 'reset',
    });
  }, []);
  return {resetWatch, stopWatch, startWatch, time, statusWatch: statusRef};
};
export default useStopwatch;
