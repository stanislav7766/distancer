import React from 'react';
import {mapContext, appModeContext, routeContext, modalContext, liveRouteContext} from './src/contexts/contexts';
import {MapState, AppModeState, RouteState, ModalState, LiveRouteState} from './src/contexts/initialStates';
import Landing from './src/pages/landing';
import Authorization from './src/pages/authorization';
import EditProfile from './src/pages/edit-profile';
import Navbar from './src/componets/navbar/Navbar';
import Navigator from 'react-native-easy-router';
import entries from './src/config/stores';
import Compose from './src/componets/context-compose/Compose';

const Main = ({navigator}) => (
  <>
    <Landing navigator={navigator} />
    <Navbar />
  </>
);

const App = () => {
  const appMode = AppModeState();
  const map = MapState();
  const modal = ModalState();
  const route = RouteState();
  const liveRoute = LiveRouteState();

  const a = (
    <Compose
      Child={<Navigator screens={{Main, Authorization, EditProfile}} initialStack="Main" />}
      wrappers={[
        {Context: liveRouteContext, value: liveRoute},
        {Context: appModeContext, value: appMode},
        {Context: mapContext, value: map},
        {Context: routeContext, value: route},
        {Context: modalContext, value: modal},
      ]}
    />
  );
  return <Compose Child={a} wrappers={entries} />;
};

export default App;
