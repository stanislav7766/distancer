import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {DIRECTIONS_MODE} from '~/constants/constants';

export class DirectionsModeStore {
  constructor() {
    makeAutoObservable(this);
  }

  directionsMode = DIRECTIONS_MODE.WALKING;
  isDirectionsMode = false;

  setDirectionsMode = directionsMode => {
    this.directionsMode = directionsMode;
  };
  setIsDirectionsMode = isDirectionsMode => {
    this.isDirectionsMode = isDirectionsMode;
  };
}

export const DirectionsModeContext = createContext();
export const useDirectionsMode = () => useContext(DirectionsModeContext);
