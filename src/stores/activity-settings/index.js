import {makeAutoObservable} from 'mobx';
import {DEFAULT_AUTO_PAUSE, DEFAULT_TIMER_ON_START, DEFAULT_VIBRATE_ON_START} from '~/constants/constants';
import {isExist} from '~/utils/validation/helpers';
import {storesDI} from '~/utils/store-di';

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
    isExist(timerOnStart) && this.setTimerOnStart(timerOnStart);
    isExist(vibrateOnStart) && this.setVibrateOnStart(vibrateOnStart);
    isExist(autoPause) && this.setAutoPause(autoPause);
  };
}
storesDI.Injectable('activitySettingsStore')(ActivitySettingsStore);

export const useActivitySettings = () => storesDI.Inject('activitySettingsStore');
