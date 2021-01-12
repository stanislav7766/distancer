import {useState} from 'react';
import {
  DEFAULT_MAP,
  DEFAULT_ROUTES,
  DEFAULT_LIVE_ROUTE,
  DEFAULT_ROUTE,
  DEFAULT_ACTIVITIES,
  APP_MODE,
  ROUTE_TYPES,
  DEFAULT_AUTH,
} from '../constants/constants';

export const ModalState = () => {
  const [modalState, setState] = useState({
    dragMode: false,
    expanded: false,
    setExpanded: expanded => setState(prev => ({...prev, expanded})),
    setDragMode: dragMode => setState(prev => ({...prev, dragMode})),
  });
  return modalState;
};
export const MapState = () => {
  const [mapState, setState] = useState({
    cameraRef: null,
    zoomLevel: DEFAULT_MAP.ZOOM,
    coordinates: DEFAULT_MAP.COORDINATES,
    setCameraRef: cameraRef => setState(prev => ({...prev, cameraRef})),
  });
  return mapState;
};

export const RouteState = () => {
  const [routeState, setState] = useState({
    currentRoute: DEFAULT_ROUTE,
    routes: DEFAULT_ROUTES,
    setRoutes: routes => setState(prev => ({...prev, routes})),
    setCurrentRoute: currentRoute =>
      setState(prev => {
        const rest = prev.currentRoute;
        return {...prev, currentRoute: {...rest, ...currentRoute}};
      }),
    setDefaultRoute: () => setState(prev => ({...prev, currentRoute: DEFAULT_ROUTE})),
    setDefaultRoutes: () => setState(prev => ({...prev, routes: DEFAULT_ROUTES})),
  });
  return routeState;
};

export const LiveRouteState = () => {
  const [liveRouteState, setState] = useState({
    liveRoute: DEFAULT_LIVE_ROUTE,
    activities: DEFAULT_ACTIVITIES,
    setActivities: activities => setState(prev => ({...prev, activities})),
    setLivePoints: lnglat =>
      setState(prev => {
        const rest = prev.liveRoute;
        return {...prev, liveRoute: {...rest, points1: [...rest.points1, lnglat]}};
      }),
    setLiveRoute: liveRoute =>
      setState(prev => {
        const rest = prev.liveRoute;
        return {...prev, liveRoute: {...rest, ...liveRoute}};
      }),
    setDefaultLiveRoute: () => setState(prev => ({...prev, liveRoute: DEFAULT_LIVE_ROUTE})),
    setDefaultActivities: () => setState(prev => ({...prev, activities: DEFAULT_ACTIVITIES})),
  });
  return liveRouteState;
};

export const AppModeState = () => {
  const [appModeState, setState] = useState({
    auth: DEFAULT_AUTH,
    appMode: APP_MODE.VIEW_MODE,
    viewMode: ROUTE_TYPES.ROUTE,
    setAuth: auth =>
      setState(prev => {
        const rest = prev.auth;
        return {...prev, auth: {...rest, ...auth}};
      }),
    setDefaultAuth: () => setState(prev => ({...prev, auth: DEFAULT_AUTH})),
    setAppMode(appMode) {
      setState(prev => ({...prev, appMode}));
    },
    setViewMode(viewMode) {
      setState(prev => ({...prev, viewMode}));
    },
  });
  return appModeState;
};
