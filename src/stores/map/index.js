import {makeAutoObservable, observe} from 'mobx';
import {DEFAULT_MAP_SETTINGS} from '~/constants/constants';
import {isExist} from '~/utils/validation/helpers';
import {storesDI} from '~/utils/store-di';

export class MapStore {
  constructor() {
    this.appStateStore = storesDI.Inject('appStateStore');
    observe(this.appStateStore, this._listenAppState);
    makeAutoObservable(this);
  }

  cameraRef = null;
  prevCameraRef = null;
  mapRef = null;

  zoomLevel = DEFAULT_MAP_SETTINGS.zoomLevel;
  centerCoordinate = DEFAULT_MAP_SETTINGS.centerCoordinate;

  showMapIcons = false;

  setMapRef = mapRef => {
    this.mapRef = mapRef ?? this.mapRef;
  };
  setCameraRef = cameraRef => {
    if (!cameraRef) {
      this.cameraRef = this.prevCameraRef;
      return;
    }
    this.prevCameraRef = this.cameraRef;
    this.cameraRef = cameraRef;
  };
  setZoomLevel = zoomLevel => {
    this.zoomLevel = zoomLevel;
  };
  setCenterCoordinate = centerCoordinate => {
    this.centerCoordinate = centerCoordinate;
  };
  setMapSettings = ({centerCoordinate, zoomLevel}) => {
    isExist(zoomLevel) && this.setZoomLevel(zoomLevel);
    isExist(centerCoordinate) && this.setCenterCoordinate(centerCoordinate);
  };
  setShowMapIcons = showMapIcons => {
    this.showMapIcons = showMapIcons;
  };
  _listenAppState = async ({name}) => {
    if (name !== 'appState') return;
    if (!this.mapRef) return;

    const zoomLevel = await this.mapRef.getZoom();
    const centerCoordinate = await this.mapRef.getCenter();
    this.setMapSettings({centerCoordinate, zoomLevel});
  };
}

export const useMap = () => storesDI.Inject('mapStore');
