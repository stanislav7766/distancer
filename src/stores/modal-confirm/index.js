import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';

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

export const ModalConfirmContext = createContext();
export const useModalConfirm = () => useContext(ModalConfirmContext);
