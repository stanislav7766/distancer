import {createContext} from 'react';
import {
  THEMES,
  DEFAULT_MAP,
  APP_MODE,
  DEFAULT_ROUTE,
  DEFAULT_PLACES,
  DEFAULT_ROUTES,
  DEFAULT_LIVE_ROUTE,
  DEFAULT_ACTIVITIES,
  ROUTE_TYPES,
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

export const liveRouteContext = createContext({
  liveRoute: DEFAULT_LIVE_ROUTE,
  activities: DEFAULT_ACTIVITIES,
  setActivities: () => {},
  setLiveRoute: () => {},
  setDefaultLiveRoute: () => {},
  setDefaultActivities: () => {},
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
  viewMode: ROUTE_TYPES.ROUTE,
  directionsMode: '',
  prevAppMode: APP_MODE.VIEW_MODE,
  isDirectionsMode: false,
  setAppMode: () => {},
  setViewMode: () => {},
  setIsDirectionsMode: () => {},
  setDirectionsMode: () => {},
});
