import {makeAutoObservable, observe} from 'mobx';
import {DEFAULT_ROUTE} from '~/constants/constants';
import {measureDistance} from '~/utils/route-helpers';
import {isEqualJson, isEqualObjJson, isFilledArr} from '~/utils/validation/helpers';
import {storesDI} from '~/utils/store-di';
import {randomID} from '~/utils/random-id';
import {getTimestamp} from '~/utils/time-helpers';

export class CurrentRouteStore {
  constructor() {
    this.activeRouteStore = storesDI.Inject('notFinishedRouteStore');
    this.authStore = storesDI.Inject('authStore');
    this.directionsModeStore = storesDI.Inject('directionsModeStore');
    makeAutoObservable(this);
    observe(this, this._listenStore);
  }
  currentRoute = DEFAULT_ROUTE;
  watchPoints = false;
  resume = false;

  setResume = resume => {
    this.resume = resume;
  };

  setCurrentRoute = currentRoute => {
    this.currentRoute = {...this.currentRoute, ...currentRoute};
  };
  setPoints = points => {
    this.currentRoute = {...this.currentRoute, points};
  };
  setId = id => {
    this.currentRoute.id = id;
  };
  setDirectionsMode = directionsMode => {
    this.currentRoute.directionsMode = directionsMode;
  };
  setDistance = distance => {
    this.currentRoute.distance = distance;
  };
  pushPoints = points => {
    this.currentRoute = {...this.currentRoute, points: [...this.currentRoute.points, ...points]};
  };
  popPoints = () => {
    const len = this.currentRoute.points.length;
    len > 0 && (this.currentRoute = {...this.currentRoute, points: this.currentRoute.points.slice(0, len - 1)});
  };
  clearPoints = () => {
    this.currentRoute = {...this.currentRoute, points: []};
  };

  setDefaultRoute = () => {
    this.setCurrentRoute(DEFAULT_ROUTE);
    this.setResume(false);
  };
  setWatchPoints = watch => {
    this.watchPoints = watch;
  };
  _listenStore = change => {
    this._isListenPoints(change) && this._listenPoints(change);
    this._isListenRoute(change) && this._listenRoute(change);
  };
  _isListenRoute = ({name}) => name === 'currentRoute';
  _listenRoute = ({newValue}) => {
    if (isEqualJson(newValue, DEFAULT_ROUTE)) {
      this.activeRouteStore.setDefaultRoute();
      return;
    }

    this.activeRouteStore.active &&
      !isEqualObjJson(newValue, DEFAULT_ROUTE) &&
      this.activeRouteStore.setNotFinishedRoute({...newValue, directionsMode: this.directionsModeStore.directionsMode});
  };

  _listenPoints = ({oldValue, newValue}) => {
    this.setDistance(measureDistance(newValue?.points));

    if (!isFilledArr(newValue.points)) {
      this.activeRouteStore.setDefaultRoute();
      return;
    }

    if (!isFilledArr(oldValue.points) && newValue.points.length === 1) {
      this.activeRouteStore.setActive({active: true, userId: this.authStore.profile.userId});
      const {directionsMode} = this.directionsModeStore;

      this.setCurrentRoute({id: randomID(), timestamp: getTimestamp(), directionsMode});
    }
  };
  _isListenPoints = ({name, oldValue, newValue}) =>
    name === 'currentRoute' && !isEqualJson(oldValue?.points, newValue?.points) && this.watchPoints;
}

export const useCurrentRoute = () => storesDI.Inject('currentRouteStore');
