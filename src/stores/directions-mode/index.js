import {makeAutoObservable} from 'mobx';
import {DIRECTIONS_MODE} from '~/constants/constants';
import {storesDI} from '~/utils/store-di';

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
storesDI.Injectable('directionsModeStore')(DirectionsModeStore);
export const useDirectionsMode = () => storesDI.Inject('directionsModeStore');
