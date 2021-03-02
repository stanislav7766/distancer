import {makeAutoObservable, observe} from 'mobx';
import {DEFAULT_LIVE_ROUTE, LIVE_SPECS_DEFAULT, LIVE_TYPES} from '~/constants/constants';
import {measureDistance} from '~/utils/route-helpers';
import {calcPace, kmPerHourToPace, calcAvgSpeed} from '~/utils/activity-helpers';
import {isEqualJson} from '~/utils/validation/helpers';
import {storesDI} from '~/utils/store-di';

const {STOP} = LIVE_TYPES;

const DEFAULT_SPECS = {
  status: STOP,
  currentSpeed: LIVE_SPECS_DEFAULT.currentSpeed,
  currentPace: LIVE_SPECS_DEFAULT.currentPace,
  movingTime: LIVE_SPECS_DEFAULT.time,
};

export class LiveRouteStore {
  constructor() {
    makeAutoObservable(this);
    observe(this, this._listenStore);
  }
  liveRoute = DEFAULT_LIVE_ROUTE;
  specs = DEFAULT_SPECS;

  watchPoints = false;

  setSpecs = specs => {
    this.specs = {...this.specs, ...specs};
  };

  setLiveRoute = liveRoute => {
    this.liveRoute = {...this.liveRoute, ...liveRoute};
  };
  setPoints = points1 => {
    this.setLiveRoute({points1});
  };
  pushPoints = points1 => {
    this.setLiveRoute({points1: [...this.liveRoute.points1, ...points1]});
  };
  setId = id => {
    this.setLiveRoute({id});
  };
  setDirectionsMode = directionsMode => {
    this.setLiveRoute({directionsMode});
  };
  setDistance = distance => {
    this.setLiveRoute({distance});
  };
  setPace = pace => {
    this.setLiveRoute({pace});
  };
  setDate = date => {
    this.setLiveRoute({date});
  };
  setAvgSpeed = avgSpeed => {
    this.setLiveRoute({avgSpeed});
  };
  setCurrentSpeed = currentSpeed => {
    this.setSpecs({currentSpeed});
  };
  setCurrentPace = currentPace => {
    this.setSpecs({currentPace});
  };
  setMovingTime = movingTime => {
    this.specs.movingTime !== movingTime && this.setSpecs({movingTime});
  };
  setStatus = status => {
    this.specs.status !== status && this.setSpecs({status});
  };
  clearPoints = () => {
    this.liveRoute = {...this.liveRoute, points1: []};
  };
  setWatchPoints = watch => {
    this.watchPoints = watch;
  };

  setDefaultLiveRoute = () => {
    this.setLiveRoute(DEFAULT_LIVE_ROUTE);
    this.setSpecs(DEFAULT_SPECS);
  };
  _listenStore = change => {
    this._isListenPoints(change) && this._listenPoints(change);
    this._isListenCurrentSpeed(change) && this._listenCurrentSpeed(change);
  };
  _listenPoints = ({newValue}) => {
    const distance = measureDistance(newValue?.points1);
    const avgSpeed = calcAvgSpeed(distance, this.specs.movingTime);
    const pace = calcPace(distance, this.specs.movingTime);
    this.setLiveRoute({avgSpeed, pace, distance});
  };
  _listenCurrentSpeed = ({newValue}) => {
    this.setCurrentPace(kmPerHourToPace(newValue?.currentSpeed));
  };

  _isListenPoints = ({name, oldValue, newValue}) =>
    name === 'liveRoute' && !isEqualJson(oldValue?.points1, newValue?.points1) && this.watchPoints;

  _isListenCurrentSpeed = ({name, oldValue, newValue}) =>
    name === 'specs' && oldValue?.currentSpeed !== newValue?.currentSpeed;
}
storesDI.Injectable('liveRouteStore')(LiveRouteStore);

export const useLiveRoute = () => storesDI.Inject('liveRouteStore');
