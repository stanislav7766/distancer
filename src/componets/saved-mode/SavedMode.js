import React, {Fragment, useContext, useEffect, useState} from 'react';
import SavedRoutes from './SavedRoutes';
import {appModeContext} from '../../contexts/contexts';
import SavedActivities from './SavedActivities';
import Btn from '../btn/Btn';

import {Row, Column, Styles} from './styles';
import {ROUTE_TYPES} from '../../constants/constants';

const {ROUTE, ACTIVITY} = ROUTE_TYPES;

const SavedMode = ({themeStyle, closeModal}) => {
  const [routeType, setRouteType] = useState(ROUTE);
  const {auth} = useContext(appModeContext);
  const {authorized} = auth;

  useEffect(() => {
    setRouteType(authorized ? ACTIVITY : ROUTE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {btnDims, btnBorder} = Styles(themeStyle);
  const routeTypeBorder = type => (type === routeType ? btnBorder : {});
  const changeRouteType = _routeType => setRouteType(_routeType);

  const RoutesButton = (
    <Btn onPress={() => changeRouteType(ROUTE)} style={{...btnDims, ...routeTypeBorder(ROUTE)}} title={'Routes'} />
  );
  const ActivitiesButton = (
    <Btn
      onPress={() => changeRouteType(ACTIVITY)}
      style={{...btnDims, ...routeTypeBorder(ACTIVITY)}}
      title={'Activities'}
    />
  );

  const Buttons = authorized && (
    <>
      <Column>{ActivitiesButton}</Column>
      <Column>{RoutesButton}</Column>
    </>
  );

  const List =
    routeType === ROUTE ? (
      <SavedRoutes themeStyle={themeStyle} closeModal={closeModal} />
    ) : (
      <SavedActivities themeStyle={themeStyle} closeModal={closeModal} />
    );

  return (
    <Fragment>
      <Row marginTop={20}>{Buttons}</Row>
      <Row marginTop={10}>{List}</Row>
    </Fragment>
  );
};

export default SavedMode;
