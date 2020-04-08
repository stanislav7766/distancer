import React from 'react';
import {
  mapContext,
  appModeContext,
  themeContext,
  routeContext,
  placesContext,
  modalContext,
} from './src/contexts/contexts';
import {MapState, AppModeState, ThemeState, PlacesState, RouteState, ModalState} from './src/contexts/initialStates';
import Navigator from 'react-native-easy-router';
import Landing from './src/pages/landing';
import Routes from './src/pages/routes';

const App = () => {
  const appMode = AppModeState();
  const map = MapState();
  const modal = ModalState();
  const places = PlacesState();
  const route = RouteState();
  const theme = ThemeState();

  return (
    <appModeContext.Provider value={appMode}>
      <themeContext.Provider value={theme}>
        <mapContext.Provider value={map}>
          <routeContext.Provider value={route}>
            <modalContext.Provider value={modal}>
              <placesContext.Provider value={places}>
                <Navigator screens={{Landing, Routes}} initialStack="Landing" />
              </placesContext.Provider>
            </modalContext.Provider>
          </routeContext.Provider>
        </mapContext.Provider>
      </themeContext.Provider>
    </appModeContext.Provider>
  );
};

export default App;
