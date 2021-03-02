import {makeAutoObservable} from 'mobx';
import {storesDI} from '~/utils/store-di';

const defaultInit = {text: '', preset: 'footer', onNo: () => {}, onYes: () => {}};

export class ModalConfirmStore {
  constructor() {
    makeAutoObservable(this);
  }

  shownWindow = false;
  init = defaultInit;

  setInit = init => {
    this.init = {...this.init, ...init};
  };

  onShowConfirm = () => {
    this.shownWindow = true;
  };
  onHideConfirm = () => {
    this.shownWindow = false;
    this.init = defaultInit;
  };
}
storesDI.Injectable('modalConfirmStore')(ModalConfirmStore);

export const useModalConfirm = () => storesDI.Inject('modalConfirmStore');
