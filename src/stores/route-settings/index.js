import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {DEFAULT_DRAG_HINTS} from '../../constants/constants';

export class RouteSettingsStore {
  constructor() {
    makeAutoObservable(this);
  }

  dragHints = DEFAULT_DRAG_HINTS;

  setDragHints = dragHints => {
    this.dragHints = dragHints;
  };

  setRouteSettings = ({dragHints}) => {
    //valid
    dragHints && this.setDragHints(dragHints);
  };
}

export const RouteSettingsContext = createContext();
export const useRouteSettings = () => useContext(RouteSettingsContext);
