import {useState} from 'react';
import {Animated} from 'react-native';
import {
  THEMES,
  DEFAULT_MAP,
  DEFAULT_ROUTES,
  DEFAULT_PLACES,
  DEFAULT_ROUTE,
  APP_MODE,
  WINDOW_HEIGHT,
} from '../constants/constants';
import {ThemeStyle} from '../constants/styles';

export const ModalState = () => {
  const [modalState, setState] = useState({
    dragMode: false,
    expanded: false,
    shownMenu: false,
    modalY: new Animated.Value(WINDOW_HEIGHT - 150),
    setExpanded: expanded => setState(prev => ({...prev, expanded})),
    setShownMenu: shownMenu => setState(prev => ({...prev, shownMenu})),
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
    setCurrentRoute: currentRoute => setState(prev => ({...prev, currentRoute})),
    setDefaultRoute: () => setState(prev => ({...prev, currentRoute: DEFAULT_ROUTE})),
    setDefaultRoutes: () => setState(prev => ({...prev, routes: DEFAULT_ROUTES})),
  });
  return routeState;
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
    setAppMode(appMode) {
      setState(prev => ({...prev, appMode}));
    },
  });
  return appModeState;
};
