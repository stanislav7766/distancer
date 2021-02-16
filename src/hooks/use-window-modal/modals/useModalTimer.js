import React, {useCallback, useEffect} from 'react';
import TimeLeft from '~/componets/time-left';
import useTimer from '~/hooks/use-timer';

export const useModalTimer = modalTimer => {
  const {shownWindow, onShowTimer, onHideTimer, init} = modalTimer;
  const {onFinish, secs} = init;

  const closeWindow = useCallback(() => {
    onHideTimer();
    onFinish();
  }, [onFinish, onHideTimer]);
  const [timeLeft, isFinish, startTimer] = useTimer();

  useEffect(() => {
    shownWindow && startTimer(secs);
  }, [secs, shownWindow, startTimer]);

  const ShowWindow = shownWindow && (
    <TimeLeft opacity={0.35} maskColor="#000" closeWindow={closeWindow} timeLeft={timeLeft} needClose={isFinish} />
  );
  return [ShowWindow, onShowTimer, onHideTimer];
};
