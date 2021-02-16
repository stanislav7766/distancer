import {useState, useEffect, useCallback} from 'react';
import {isExist} from '~/utils/validation/helpers';

const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(undefined);

  const startTimer = useCallback(secs => {
    setTimeLeft(secs);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) setTimeLeft(undefined);
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(old => old - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const isFinish = isExist(timeLeft) && timeLeft === 0;

  return [timeLeft, isFinish, startTimer];
};

export default useTimer;
