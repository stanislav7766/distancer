import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import SavedRoutes from './SavedRoutes';
import {appModeContext} from '../../contexts/contexts';
import SavedActivities from './SavedActivities';
import Section from '../section/Section';
import Touchable from '../touchable/Touchable';
import {Row, Column, Styles, mt20, mt10} from './styles';
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

  const {styleSection} = Styles(themeStyle);
  const routeTypeBorder = type => (type === routeType ? themeStyle.accentColor : themeStyle.sectionColor);
  const changeRouteType = _routeType => setRouteType(_routeType);

  const RoutesButton = (
    <Touchable
      onPress={() => changeRouteType(ROUTE)}
      Child={
        <>
          <Text style={styleSection}>Routes</Text>
          <Section width={130} borderColor={routeTypeBorder(ROUTE)} />
        </>
      }
    />
  );

  const ActivitiesButton = (
    <Touchable
      onPress={() => changeRouteType(ACTIVITY)}
      Child={
        <>
          <Text style={styleSection}>Activities</Text>
          <Section width={130} borderColor={routeTypeBorder(ACTIVITY)} />
        </>
      }
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
      <Row {...mt20}>{Buttons}</Row>
      <Row {...mt10}>{List}</Row>
    </Fragment>
  );
};

export default SavedMode;
