import {makeAutoObservable} from 'mobx';
import Toast from 'react-native-simple-toast';
import {APP_MODE} from '~/constants/constants';
import {storesDI} from '~/utils/store-di';
import {isFilledArr} from '~/utils/validation/helpers';

const defaultInit = {
  headerText: '',
  preset: 'close',
  route: null,
  userId: null,
  saveRoute: () => {},
};

export class ModalNotFinishedRouteStore {
  constructor() {
    this.activeRouteStore = storesDI.Inject('notFinishedRouteStore');
    this.currentRouteStore = storesDI.Inject('currentRouteStore');
    this.appModeStore = storesDI.Inject('appModeStore');
    this.localeStore = storesDI.Inject('localeStore');
    makeAutoObservable(this);
  }

  shownWindow = false;
  init = defaultInit;

  setInit = init => {
    this.init = {...this.init, ...init};
  };
  onSave = () => {
    const {userId, route, saveRoute} = this.init;

    saveRoute({payload: {userId, route}})
      .then(res => {
        const {success, reason} = res;
        Toast.show(success ? this.localeStore.papyrusify('drawMode.message.saved') : reason);
        success && this.activeRouteStore.setDefaultRoute();
      })
      .catch(_ => {
        Toast.show(this.localeStore.papyrusify('common.message.errorOccurred'));
      });
    this.onHideWindow();
  };
  onContinue = () => {
    const {route} = this.init;

    this.currentRouteStore.setResume(isFilledArr(route.points));
    this.currentRouteStore.setCurrentRoute(route);
    this.appModeStore.setAppMode(APP_MODE.DRAW_MODE);

    this.onHideWindow();
  };
  onDelete = () => {
    this.activeRouteStore.setDefaultRoute();
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

export const useModalNotFinishedRoute = () => storesDI.Inject('modalNotFinishedRouteStore');
