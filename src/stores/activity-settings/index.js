import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {DEFAULT_AUTO_PAUSE, DEFAULT_TIMER_ON_START, DEFAULT_VIBRATE_ON_START} from '../../constants/constants';

export class ActivitySettingsStore {
  constructor() {
    makeAutoObservable(this);
  }

  timerOnStart = DEFAULT_TIMER_ON_START;
  vibrateOnStart = DEFAULT_VIBRATE_ON_START;
  autoPause = DEFAULT_AUTO_PAUSE;

  setTimerOnStart = timerOnStart => {
    this.timerOnStart = timerOnStart;
  };
  setVibrateOnStart = vibrateOnStart => {
    this.vibrateOnStart = vibrateOnStart;
  };
  setAutoPause = autoPause => {
    this.autoPause = autoPause;
  };
  setActivitySettings = ({timerOnStart, vibrateOnStart, autoPause}) => {
    //valid
    timerOnStart && this.setTimerOnStart(timerOnStart);
    vibrateOnStart && this.setVibrateOnStart(vibrateOnStart);
    autoPause && this.setAutoPause(autoPause);
  };
}

export const ActivitySettingsContext = createContext();
export const useActivitySettings = () => useContext(ActivitySettingsContext);
