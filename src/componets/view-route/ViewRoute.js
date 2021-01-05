import React, {useContext} from 'react';
import Route from './Route';
import {appModeContext} from '../../contexts/contexts';
import Activity from './Activity';
import {ROUTE_TYPES} from '../../constants/constants';
const {ROUTE} = ROUTE_TYPES;

const ViewRoute = ({themeStyle}) => {
  const {viewMode} = useContext(appModeContext);

  return viewMode === ROUTE ? <Route themeStyle={themeStyle} /> : <Activity themeStyle={themeStyle} />;
};
export default ViewRoute;
