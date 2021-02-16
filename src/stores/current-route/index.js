import {createContext, useContext} from 'react';
import {makeAutoObservable, observe} from 'mobx';
import {DEFAULT_ROUTE} from '~/constants/constants';
import {measureDistance} from '~/utils/route-helpers';
import {isEqualJson} from '~/utils/validation/helpers';

export class CurrentRouteStore {
  constructor() {
    makeAutoObservable(this);
    observe(this, this._listenStore);
  }
  currentRoute = DEFAULT_ROUTE;
  watchPoints = false;

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
  };
  setWatchPoints = watch => {
    this.watchPoints = watch;
  };
  _listenStore = change => {
    this._isListenPoints(change) && this._listenPoints(change);
  };
  _listenPoints = ({newValue}) => {
    this.setDistance(measureDistance(newValue?.points));
  };
  _isListenPoints = ({name, oldValue, newValue}) =>
    name === 'currentRoute' && !isEqualJson(oldValue?.points, newValue?.points) && this.watchPoints;
}

export const CurrentRouteContext = createContext();
export const useCurrentRoute = () => useContext(CurrentRouteContext);
