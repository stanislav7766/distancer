import {useState} from 'react';
import {Animated} from 'react-native';
import {
  THEMES,
  DEFAULT_MAP,
  DEFAULT_ROUTES,
  DEFAULT_LIVE_ROUTE,
  DEFAULT_PLACES,
  DEFAULT_ROUTE,
  DEFAULT_ACTIVITIES,
  APP_MODE,
  ROUTE_TYPES,
} from '../constants/constants';
import {ThemeStyle} from '../constants/styles';

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

export const PlacesState = () => {
  const [placesState, setState] = useState({
    places: DEFAULT_PLACES,
    setDefaultPlaces: () => setState(prev => ({...prev, places: DEFAULT_PLACES})),
    setPlaces: places => setState(prev => ({...prev, places})),
  });
  return placesState;
};

export const ThemeState = () => {
  const [themeState, setState] = useState({
    theme: THEMES.LIGHT,
    getThemeStyle: theme => ThemeStyle[theme],
    setTheme: theme => setState(prev => ({...prev, theme})),
  });
  return themeState;
};

export const AppModeState = () => {
  const [appModeState, setState] = useState({
    appMode: APP_MODE.VIEW_MODE,
    viewMode: ROUTE_TYPES.ROUTE,
    directionsMode: '',
    isDirectionsMode: false,
    setAppMode(appMode) {
      setState(prev => ({...prev, appMode}));
    },
    setViewMode(viewMode) {
      setState(prev => ({...prev, viewMode}));
    },
    setIsDirectionsMode(isDirectionsMode) {
      setState(prev => ({...prev, isDirectionsMode}));
    },
    setDirectionsMode(directionsMode) {
      setState(prev => ({...prev, directionsMode}));
    },
  });
  return appModeState;
};
