import React, {Fragment} from 'react';
import {
  mapContext,
  appModeContext,
  themeContext,
  routeContext,
  placesContext,
  modalContext,
  liveRouteContext,
} from './src/contexts/contexts';
import {
  MapState,
  AppModeState,
  ThemeState,
  PlacesState,
  RouteState,
  ModalState,
  LiveRouteState,
} from './src/contexts/initialStates';
import Landing from './src/pages/landing';
import Navbar from './src//componets/navbar/Navbar';
import Compose from './src/componets/context-compose/Compose';

const Main = (
  <Fragment>
    <Landing />
    <Navbar />
  </Fragment>
);

const App = () => {
  const appMode = AppModeState();
  const map = MapState();
  const modal = ModalState();
  const places = PlacesState();
  const route = RouteState();
  const theme = ThemeState();
  const liveRoute = LiveRouteState();

  return (
    <Compose
      Child={Main}
      wrappers={[
        {Context: liveRouteContext, value: liveRoute},
        {Context: appModeContext, value: appMode},
        {Context: themeContext, value: theme},
        {Context: mapContext, value: map},
        {Context: routeContext, value: route},
        {Context: modalContext, value: modal},
        {Context: placesContext, value: places},
      ]}
    />
  );
};

export default App;
