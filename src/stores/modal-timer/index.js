import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';

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

export const ModalTimerContext = createContext();
export const useModalTimer = () => useContext(ModalTimerContext);
