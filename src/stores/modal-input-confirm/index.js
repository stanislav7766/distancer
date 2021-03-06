import {makeAutoObservable} from 'mobx';
import {storesDI} from '~/utils/store-di';

const defaultInit = {
  headerText: '',
  btnText: '',
  preset: 'footer',
  onNo: () => {},
  onYes: () => {},
  input: {
    placeholder: '',
    style: {},
  },
};

export class ModalInputConfirmStore {
  constructor() {
    makeAutoObservable(this);
  }

  shownWindow = false;
  init = defaultInit;

  setInit = init => {
    this.init = {...this.init, ...init};
  };

  onShowInputConfirm = () => {
    this.shownWindow = true;
  };
  onHideInputConfirm = () => {
    this.shownWindow = false;
    this.init = defaultInit;
  };
}

export const useModalInputConfirm = () => storesDI.Inject('modalInputConfirmStore');
