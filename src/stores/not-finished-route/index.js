import {makeAutoObservable} from 'mobx';
import {DEFAULT_ROUTE} from '~/constants/constants';
import {storesDI} from '~/utils/store-di';

export class NotFinishedRouteStore {
  constructor() {
    makeAutoObservable(this);
  }
  route = DEFAULT_ROUTE;
  active = false;
  userId = null;

  setNotFinishedRoute = route => {
    this.route = {...this.route, ...route};
  };
  setActive = ({active, userId}) => {
    this.active = active;
    this.userId = userId;
  };

  setDefaultRoute = () => {
    this.setNotFinishedRoute(DEFAULT_ROUTE);
    this.setActive({active: false, userId: null});
  };
}

export const useNotFinishedRoute = () => storesDI.Inject('notFinishedRouteStore');
export const getNotFinishedRoute = () => storesDI.Inject('notFinishedRouteStore');
