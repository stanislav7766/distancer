import {makeAutoObservable} from 'mobx';
import {storesDI} from '~/utils/store-di';

const defaultInit = {onFinish: () => {}, secs: 0};

export class ModalTimerStore {
  constructor() {
    makeAutoObservable(this);
  }

  shownWindow = false;
  init = defaultInit;

  setInit = init => {
    this.init = {...this.init, ...init};
  };

  onShowTimer = () => {
    this.shownWindow = true;
  };
  onHideTimer = () => {
    this.shownWindow = false;
    this.init = defaultInit;
  };
}
storesDI.Injectable('modalTimerStore')(ModalTimerStore);

export const useModalTimer = () => storesDI.Inject('modalTimerStore');
