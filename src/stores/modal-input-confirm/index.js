import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';

const defaultInit = {
  headerText: '',
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

export const ModalInputConfirmContext = createContext();
export const useModalInputConfirm = () => useContext(ModalInputConfirmContext);
