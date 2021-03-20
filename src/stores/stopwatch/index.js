import {makeAutoObservable} from 'mobx';
import {storesDI} from '~/utils/store-di';
import {getTimestamp, msTohhmmss} from '~/utils/time-helpers';

export class StopwatchStore {
  constructor() {
    makeAutoObservable(this);
  }

  status = 'reset';
  state = 'foreground';

  time = {
    ms: 0,
    hhmmss: '00:00:00',
  };

  bg = {
    beforeBg: 0,
    startBg: 0,
  };
  launchMs = 0;
  timerId = null;

  get isBackground() {
    return this.state === 'background';
  }
  get isTick() {
    return this.status === 'tick';
  }
  get isStop() {
    return this.status === 'stop';
  }
  get updatedMs() {
    const bgTime = getTimestamp() - this.bg.startBg;
    return bgTime + this.bg.beforeBg;
  }
  get totalTime() {
    return msTohhmmss(getTimestamp() - this.launchMs);
  }

  setStatus = status => {
    this.status !== status && (this.status = status);
  };
  setState = state => {
    this.state !== state && (this.state = state);
  };
  setLauchMs = (ms = getTimestamp()) => {
    this.launchMs = ms;
  };
  setTimeMs = ms => {
    this.time = {
      ms,
      hhmmss: msTohhmmss(ms),
    };
  };
  setBg = bg => {
    this.bg = {...this.bg, ...bg};
  };
  setDefault = () => {
    this.setStatus('reset');
    this.setState('foreground');
    this.setTimeMs(0);
    this.setLauchMs(0);
    this.setBg({beforeBg: 0, startBg: 0});
    this.timerId = null;
  };
  snapshotBg = () => {
    this.setBg({startBg: getTimestamp(), beforeBg: this.time.ms});
  };
  applySnapshotBg = () => {
    this.setTimeMs(this.updatedMs);
  };

  _startWatch = (startFromMs = 0, a = true) => {
    if (this.isBackground) {
      this.snapshotBg();
      return;
    }
    if (this.isTick) return;

    const resetFlag = () => (a = false);

    this.setStatus('tick');
    this.timerId = setInterval(() => {
      const isContinueFrom = !!(a && startFromMs !== 0);
      isContinueFrom && resetFlag();

      const ms = isContinueFrom ? startFromMs : this.time.ms;
      this.setTimeMs(ms + 1000);
    }, 1000);
  };
  _stopWatch = () => {
    if (this.isBackground) {
      this.applySnapshotBg();
      return;
    }
    if (this.isStop) return;

    clearInterval(this.timerId);
    this.setStatus('stop');
  };

  _resetWatch = () => {
    this.setDefault();
  };
  startWatch = (ms = 0, launchMs = getTimestamp()) => {
    this.setLauchMs(launchMs);
    this._startWatch(ms);
  };

  stopWatch = () => {
    this._stopWatch();
  };
  continueWatch = () => {
    this._startWatch();
  };
  resetWatch = () => {
    this._resetWatch();
  };
  toBackground = () => {
    if (this.isBackground) return;
    if (!this.isTick) {
      this.setState('background');
      return;
    }
    this._stopWatch();
    this.setState('background');
    this.snapshotBg();
  };

  toForeground = needStart => {
    if (!this.isBackground) return;
    if (!this.isStop) {
      this.setState('foreground');
      return;
    }
    this.setState('foreground');
    needStart && this._startWatch(this.updatedMs);
  };
}

export const useStopwatch = () => storesDI.Inject('stopwatchStore');
