import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import SavedRoutes from './SavedRoutes';
import SavedActivities from './SavedActivities';
import Section from '../section/Section';
import Touchable from '../touchable/Touchable';
import {Row, Column, Styles, mt20, mt10} from './styles';
import {ROUTE_TYPES} from '../../constants/constants';
import {useAuth} from '../../stores/auth';
import {observer} from 'mobx-react-lite';

const {ROUTE, ACTIVITY} = ROUTE_TYPES;

const SavedMode = ({themeStyle}) => {
  const [tabType, setTabType] = useState(ROUTE);
  const [buttonsHeight, setButtonsHeight] = useState(0);
  const isRoute = tabType === ROUTE;
  const {authorized, setAuthorized} = useAuth();

  useEffect(() => {
    !authorized && setButtonsHeight(0);
  }, [authorized]);

  const {styleSection} = Styles(themeStyle);
  const routeTypeBorder = type => (type === tabType ? themeStyle.accentColor : themeStyle.sectionColor);
  const changeRouteType = _routeType => setTabType(_routeType);

  const renderButton = ({title, type}) => (
    <>
      <Text style={styleSection}>{title}</Text>
      <Section width={130} borderColor={routeTypeBorder(type)} />
    </>
  );

  const onLayoutButtons = e => {
    setButtonsHeight(e?.nativeEvent?.layout?.height ?? 0);
  };

  const Buttons = authorized && (
    <View onLayout={onLayoutButtons}>
      <Row {...mt20}>
        <Column>
          <Touchable
            onPress={changeRouteType.bind(null, ACTIVITY)}
            Child={renderButton({title: 'Activities', type: ACTIVITY})}
          />
        </Column>
        <Column>
          <Touchable
            onPress={() => {
              changeRouteType(ROUTE);
              setAuthorized(false);
            }}
            Child={renderButton({title: 'Routes', type: ROUTE})}
          />
        </Column>
      </Row>
    </View>
  );

  const List = (
    <Row paddingBottom={buttonsHeight} {...mt10}>
      {isRoute ? <SavedRoutes themeStyle={themeStyle} /> : <SavedActivities themeStyle={themeStyle} />}
    </Row>
  );

  return (
    <>
      {Buttons}
      {List}
    </>
  );
};

export default observer(SavedMode);
