import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {DEFAULT_DRAG_HINTS} from '~/constants/constants';
import {isExist} from '~/utils/validation/helpers';

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

export const RouteSettingsContext = createContext();
export const useRouteSettings = () => useContext(RouteSettingsContext);
