import {makeAutoObservable} from 'mobx';
import {storesDI} from '~/utils/store-di';

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
storesDI.Injectable('modalPickerStore')(ModalPickerStore);

export const useModalPicker = () => storesDI.Inject('modalPickerStore');
