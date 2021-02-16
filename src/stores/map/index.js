import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {DEFAULT_MAP_SETTINGS} from '~/constants/constants';
import {isExist} from '~/utils/validation/helpers';

export class MapStore {
  constructor() {
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
}

export const MapContext = createContext();
export const useMap = () => useContext(MapContext);
