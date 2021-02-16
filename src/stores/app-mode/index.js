import {createContext, useContext} from 'react';
import {makeAutoObservable, observe} from 'mobx';
import {APP_MODE, ROUTE_TYPES} from '~/constants/constants';

const {VIEW_MODE} = APP_MODE;
const {ROUTE} = ROUTE_TYPES;

export class AppModeStore {
  constructor() {
    makeAutoObservable(this);
    observe(this, this._listenViewRouteMode);
  }

  appMode = VIEW_MODE;
  viewRouteMode = ROUTE;
  isViewRouteMode = true;
  liveWithRoute = false;
  dragMode = false;

  setAppMode = appMode => {
    this.appMode = appMode;
  };
  setDragMode = dragMode => {
    this.dragMode = dragMode;
  };
  setViewRouteMode = viewRouteMode => {
    this.viewRouteMode = viewRouteMode;
  };
  setLiveWithRoute = liveWithRoute => {
    this.liveWithRoute = liveWithRoute;
  };
  _listenViewRouteMode = ({name, newValue}) => {
    if (name !== 'viewRouteMode') return;

    const mode = newValue === ROUTE;
    this.isViewRouteMode !== mode && (this.isViewRouteMode = mode);
  };
}

export const AppModeContext = createContext();
export const useAppMode = () => useContext(AppModeContext);
