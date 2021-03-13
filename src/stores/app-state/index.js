import {makeAutoObservable} from 'mobx';
import {storesDI} from '~/utils/store-di';
import {AppState} from 'react-native';

export class AppStateStore {
  constructor() {
    makeAutoObservable(this);
  }

  appState = AppState.currentState;
  allowUpdate = true;

  get isGoOut() {
    return this.appState === 'background' || this.appState === 'inactive';
  }
  setAppState = nextState => {
    this.allowUpdate && (this.appState = nextState);
  };
  setAllowUpdate = allowUpdate => {
    this.allowUpdate = allowUpdate;
  };
}

export const useAppState = () => storesDI.Inject('appStateStore');
export const getAppState = () => storesDI.Inject('appStateStore');
