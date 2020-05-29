import {createContext} from 'react';
import {
  THEMES,
  DEFAULT_MAP,
  APP_MODE,
  DEFAULT_ROUTE,
  DEFAULT_PLACES,
  DEFAULT_ROUTES,
  WINDOW_HEIGHT,
} from '../constants/constants';

export const mapContext = createContext({
  zoomLevel: DEFAULT_MAP.ZOOM,
  cameraRef: null,
  coordinates: DEFAULT_MAP.COORDINATES,
  setCameraRef: () => {},
});
export const modalContext = createContext({
  shownMenu: false,
  dragMode: false,
  expanded: false,
  modalY: WINDOW_HEIGHT - 150,
  setShownMenu: () => {},
  setExpanded: () => {},
  setDragMode: () => {},
});

export const routeContext = createContext({
  currentRoute: DEFAULT_ROUTE,
  routes: DEFAULT_ROUTES,
  setRoutes: () => {},
  setCurrentRoute: () => {},
  setDefaultRoute: () => {},
  setDefaultRoutes: () => {},
});

export const placesContext = createContext({
  places: DEFAULT_PLACES,
  setDefaultPlaces: () => {},
  setPlaces: () => {},
});

export const themeContext = createContext({
  theme: THEMES.LIGHT,
  getThemeStyle: () => {},
  setTheme: () => {},
});

export const appModeContext = createContext({
  appMode: APP_MODE.VIEW_MODE,
  prevAppMode: APP_MODE.VIEW_MODE,
  isDirectionsMode: false,
  setAppMode: () => {},
  setIsDirectionsMode: () => {},
});
