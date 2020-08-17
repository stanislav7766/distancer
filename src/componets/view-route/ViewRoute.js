import React, {useContext, useState} from 'react';
import Route from './Route';
import {appModeContext} from '../../contexts/contexts';
import Activity from './Activity';
import {ROUTE_TYPES} from '../../constants/constants';
const {ROUTE, ACTIVITY} = ROUTE_TYPES;

const ViewRoute = ({themeStyle, expandRoute, expandActivity}) => {
  const {viewMode} = useContext(appModeContext);
  useState(() => {
    viewMode === ROUTE && expandRoute();
    viewMode === ACTIVITY && expandActivity();
  }, [viewMode]);

  return viewMode === ROUTE ? <Route themeStyle={themeStyle} /> : <Activity themeStyle={themeStyle} />;
};
export default ViewRoute;
