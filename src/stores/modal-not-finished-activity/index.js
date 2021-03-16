import {makeAutoObservable} from 'mobx';
import Toast from 'react-native-simple-toast';
import {storesDI} from '~/utils/store-di';

const defaultInit = {
  headerText: '',
  preset: 'close',
  activity: null,
  userId: null,
  saveActivity: () => {},
};

export class ModalNotFinishedActivityStore {
  constructor() {
    this.activeLiveStore = storesDI.Inject('notFinishedLiveStore');
    this.localeStore = storesDI.Inject('localeStore');
    makeAutoObservable(this);
  }

  shownWindow = false;
  init = defaultInit;

  setInit = init => {
    this.init = {...this.init, ...init};
  };
  onSave = () => {
    const {userId, activity, saveActivity} = this.init;

    saveActivity({payload: {userId, activity}})
      .then(res => {
        const {success, reason} = res;
        Toast.show(success ? this.localeStore.papyrusify('liveMode.message.saved') : reason);
        success && this.activeLiveStore.setDefaultLive();
      })
      .catch(_ => {
        Toast.show(this.localeStore.papyrusify('common.message.errorOccurred'));
      });
    this.onHideWindow();
  };
  onContinue = () => {
    this.onHideWindow();
  };
  onDelete = () => {
    this.activeLiveStore.setDefaultLive();
    this.onHideWindow();
  };

  onShowWindow = () => {
    this.shownWindow = true;
  };
  onHideWindow = () => {
    this.shownWindow = false;
    this.init = defaultInit;
  };
}

export const useModalNotFinishedActivity = () => storesDI.Inject('modalNotFinishedActivityStore');
