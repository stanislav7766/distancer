import {makeAutoObservable} from 'mobx';
import {DEFAULT_LIVE_ROUTE} from '~/constants/constants';
import {storesDI} from '~/utils/store-di';

export class NotFinishedLiveStore {
  constructor() {
    makeAutoObservable(this);
  }
  activity = DEFAULT_LIVE_ROUTE;
  active = false;
  userId = null;

  setNotFinishedLive = activity => {
    this.activity = {...this.activity, ...activity};
  };
  setActive = ({active, userId}) => {
    this.active = active;
    this.userId = userId;
  };

  setDefaultLive = () => {
    this.setNotFinishedLive(DEFAULT_LIVE_ROUTE);
    this.setActive({active: false, userId: null});
  };
}

export const useNotFinishedLive = () => storesDI.Inject('notFinishedLiveStore');
export const getNotFinishedLive = () => storesDI.Inject('notFinishedLiveStore');
