import {makeAutoObservable} from 'mobx';
import {filterByKey, findIndexByKey} from '~/utils/common-helpers/arr-helpers';
import {storesDI} from '~/utils/store-di';

const defaultInit = {
  deleteHeaderText: '',
  preset: 'footer',
  deleteMultiple: () => {},
};

export class MultipleSelectBarStore {
  constructor() {
    this.directionsModeStore = storesDI.Inject('directionsModeStore');
    this.modalConfirmStore = storesDI.Inject('modalConfirmStore');
    makeAutoObservable(this);
  }

  init = defaultInit;

  setInit = init => {
    this.init = {...this.init, ...init};
  };

  showBar = false;
  count = 0;
  selected = [];
  wasDirections = false;

  addSelected = selected => {
    this.selected = [...this.selected, selected];
    this.incCount();
  };

  removeSelected = selectedId => {
    this.selected = filterByKey(this.selected, 'id', selectedId);
    this.decCount();
  };

  onTap = item => {
    findIndexByKey(this.selected, 'id', item.id) === -1 ? this.addSelected(item) : this.removeSelected(item.id);
  };

  incCount = () => {
    this.count += 1;
  };
  decCount = () => {
    this.count -= 1;
  };
  onShowBar = () => {
    if (this.directionsModeStore.isDirectionsMode) {
      this.directionsModeStore.setIsDirectionsMode(false);
      this.wasDirections = true;
    }
    this.showBar = true;
  };
  setDefault = () => {
    this.showBar = false;
    this.count = 0;
    this.selected = [];
    this.setDefaultWasDirections();
    this.setInit(defaultInit);
  };

  setDefaultWasDirections = () => {
    if (!this.wasDirections) return;

    this.wasDirections = false;
    this.directionsModeStore.setIsDirectionsMode(true);
  };

  onHideBar = () => {
    this.setDefault();
  };
  onDelete = () => {
    this.modalConfirmStore.setInit({
      text: this.init.deleteHeaderText,
      preset: this.init.preset,
      onYes: this.init.deleteMultiple,
      onNo: this.modalConfirmStore.onHideConfirm,
    });
    this.modalConfirmStore.onShowConfirm();
  };
  onCancel = () => {
    this.onHideBar();
  };
  onMenu = () => {};
}

export const useMultipleSelectBar = () => storesDI.Inject('multipleSelectBarStore');
export const getMultipleSelectBar = () => storesDI.Inject('multipleSelectBarStore');
