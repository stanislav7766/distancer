import {makeAutoObservable, observe} from 'mobx';
import {DEFAULT_LIVE_ROUTE, LIVE_SPECS_DEFAULT, LIVE_TYPES} from '~/constants/constants';
import {measureDistance} from '~/utils/route-helpers';
import {calcPace, kmPerHourToPace, calcAvgSpeed} from '~/utils/activity-helpers';
import {isEqualJson} from '~/utils/validation/helpers';
import {storesDI} from '~/utils/store-di';
import {randomID} from '~/utils/random-id';
import {getTimestamp, yyyymmddNow} from '~/utils/time-helpers';

const {STOP, GO, PAUSE} = LIVE_TYPES;

const DEFAULT_SPECS = {
  status: STOP,
  currentSpeed: LIVE_SPECS_DEFAULT.currentSpeed,
  currentPace: LIVE_SPECS_DEFAULT.currentPace,
  movingTime: LIVE_SPECS_DEFAULT.time,
};

export class LiveRouteStore {
  constructor() {
    this.appStateStore = storesDI.Inject('appStateStore');
    this.stopwatchStore = storesDI.Inject('stopwatchStore');
    this.directionsModeStore = storesDI.Inject('directionsModeStore');

    observe(this.appStateStore, this._listenAppStateStore);
    observe(this.stopwatchStore, this._listenStopWatchStore);
    makeAutoObservable(this);
    observe(this, this._listenStore);
  }
  liveRoute = DEFAULT_LIVE_ROUTE;
  specs = DEFAULT_SPECS;

  watchPoints = false;

  setSpecs = specs => {
    this.specs = {...this.specs, ...specs};
  };

  onStartActivity = () => {
    this.stopwatchStore.startWatch();
    this.setStatus(GO);
    this.setLiveRoute({id: randomID(), date: yyyymmddNow(), timestamp: getTimestamp()});
  };
  onPauseActivity = () => {
    this.stopwatchStore.stopWatch();
    this.setStatus(PAUSE);
  };
  onContinueActivity = () => {
    this.stopwatchStore.continueWatch();
    this.setStatus(GO);
  };
  onFinishActivity = () => {
    this.stopwatchStore.stopWatch();
    const {movingTime} = this.specs;
    const {totalTime} = this.stopwatchStore;
    const {directionsMode} = this.directionsModeStore;
    const activity = {...this.liveRoute, totalTime, movingTime, directionsMode};

    this.stopwatchStore.resetWatch();
    this.setStatus(STOP);
    this.setDefaultLiveRoute();
    return activity;
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

  _listenAppStateStore = ({name}) => {
    if (name !== 'appState') return;

    if (this.appStateStore.isGoOut) {
      this.stopwatchStore.toBackground();
      return;
    }
    const needStart = this.specs.status === GO;
    this.stopwatchStore.toForeground(needStart);
  };
  _listenStopWatchStore = ({name, newValue}) => {
    if (name !== 'time') return;
    this.setMovingTime(newValue.hhmmss);
  };
}

export const useLiveRoute = () => storesDI.Inject('liveRouteStore');
