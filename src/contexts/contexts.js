import {createContext} from 'react';
import {
  DEFAULT_MAP,
  APP_MODE,
  DEFAULT_ROUTE,
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
  dragMode: false,
  expanded: false,
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
  setLivePoints: () => {},
  setLiveRoute: () => {},
  setDefaultLiveRoute: () => {},
  setDefaultActivities: () => {},
});

export const appModeContext = createContext({
  appMode: APP_MODE.VIEW_MODE,
  viewMode: ROUTE_TYPES.ROUTE,
  setAppMode: () => {},
  setViewMode: () => {},
});
