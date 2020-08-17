import React, {Fragment, useEffect, useState} from 'react';
import SavedRoutes from './SavedRoutes';
import SavedActivities from './SavedActivities';
import Btn from '../btn/Btn';

import {Row, Column, Styles} from './styles';
import {ROUTE_TYPES} from '../../constants/constants';

const {ROUTE, ACTIVITY} = ROUTE_TYPES;

const SavedMode = ({themeStyle, closeModal}) => {
  const [routeType, setRouteType] = useState('');

  useEffect(() => {
    setRouteType(ACTIVITY);
  }, []);

  const {btnDims} = Styles(themeStyle);
  const changeRouteType = _routeType => setRouteType(_routeType);

  const RoutesButton = <Btn onPress={() => changeRouteType(ROUTE)} style={btnDims} title={'Routes'} />;
  const ActivitiesButton = <Btn onPress={() => changeRouteType(ACTIVITY)} style={btnDims} title={'Activities'} />;

  const List =
    routeType === ROUTE ? (
      <SavedRoutes themeStyle={themeStyle} closeModal={closeModal} />
    ) : (
      <SavedActivities themeStyle={themeStyle} closeModal={closeModal} />
    );

  return (
    <Fragment>
      <Row marginTop={20}>
        <Column>{ActivitiesButton}</Column>
        <Column>{RoutesButton}</Column>
      </Row>
      <Row marginTop={10}>{List}</Row>
    </Fragment>
  );
};

export default SavedMode;
