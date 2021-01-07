import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';

const defaultInit = {
  pickerItems: [],
  mode: 'single',
  setSelectedItems: ([value]) => {},
  selectedItems: [],
  defaultItem: null,
};

export class ModalPickerStore {
  constructor() {
    makeAutoObservable(this);
  }

  shownWindow = false;
  init = defaultInit;

  setInit = init => {
    this.init = {...this.init, ...init};
  };

  onShowPicker = () => {
    this.shownWindow = true;
  };
  onHidePicker = () => {
    this.shownWindow = false;
    this.init = defaultInit;
  };
}

export const ModalPickerContext = createContext();
export const useModalPicker = () => useContext(ModalPickerContext);
