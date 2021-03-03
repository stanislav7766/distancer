import {makeAutoObservable} from 'mobx';
import {DEFAULT_DRAG_HINTS} from '~/constants/constants';
import {isExist} from '~/utils/validation/helpers';
import {storesDI} from '~/utils/store-di';

export class RouteSettingsStore {
  constructor() {
    makeAutoObservable(this);
  }

  dragHints = DEFAULT_DRAG_HINTS;

  setDragHints = dragHints => {
    this.dragHints = dragHints;
  };

  setRouteSettings = ({dragHints}) => {
    isExist(dragHints) && this.setDragHints(dragHints);
  };
}

export const useRouteSettings = () => storesDI.Inject('routeSettingsStore');
