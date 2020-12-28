import {useState} from 'react';
import {msTohhmmss} from '../../utils/timeToSec';

const useStopwatch = () => {
  const [timerId, setTimerId] = useState();
  const [time, setTime] = useState({ms: 0, hhmmss: '00:00:00', status: 'reset'});

  const _startWatch = (startFromMs = 0, a = true) => {
    const resetFlag = () => (a = false);
    setTimerId(
      setInterval(() => {
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
      }, 10),
    );
  };
  const startWatch = (ms = 0) => {
    _startWatch(ms);
  };

  const stopWatch = () => {
    setTime(_time => {
      clearInterval(timerId);
      return {
        ..._time,
        status: 'stop',
      };
    });
  };

  const resetWatch = () => {
    clearInterval(timerId);
    setTime({
      ms: 0,
      hhmmss: '00:00:00',
      status: 'reset',
    });
  };
  return {resetWatch, stopWatch, startWatch, time};
};
export default useStopwatch;
