import React, {Fragment, useEffect, useContext} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {themeContext, modalContext, mapContext, appModeContext, routeContext} from '../../contexts/contexts';
import {Groove} from '../../contexts/Groove';
import Toast from 'react-native-simple-toast';
import RoundedIcon from '../../componets/rounded-icon/RoundedIcon';
import Item from '../../componets/item/Item';
import IconDot from '../../componets/svg-icons/icon-dot/IconDot';
import IconCancel from '../../componets/svg-icons/icon-cancel/IconCancel';
import IconMenu from '../../componets/svg-icons/icon-menu/IconMenu';
import {readRoutes} from '../../utils/fs';
import {isEmptyArr} from '../../utils/isEmptyArr';
import {Container, WrapRoutes, Row, Styles} from './styles';
import {APP_MODE} from '../../constants/constants';

const {VIEW_ROUTE} = APP_MODE;
const {width, height} = Dimensions.get('window');

const Routes = ({navigator}) => {
  const {getThemeStyle, theme} = useContext(themeContext);
  const {shownMenu, setShownMenu} = useContext(modalContext);
  const {zoomLevel, cameraRef} = useContext(mapContext);
  const {setAppMode} = useContext(appModeContext);
  const {moveCamera} = Groove(cameraRef);
  const {routes, setCurrentRoute, setRoutes} = useContext(routeContext);
  const themeStyle = getThemeStyle(theme);

  const isLastPoint = i => i === routes.length - 1;
  const {styleCancelIcon, styleMenuIcon, styleItem} = Styles(themeStyle);

  useEffect(() => {
    (async () => {
      try {
        const _routes = await readRoutes();
        isEmptyArr(_routes) ? setRoutes(_routes) : Toast.show('Routes list is empty');
      } catch (error) {
        Toast.show('An error occurred');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const IconCancelWrap = <IconCancel width={46} height={46} fill={themeStyle.accentColorSecondary} />;
  const IconMenuWrap = <IconMenu width={26} height={20} fill={themeStyle.accentColor} />;
  const IconDotWrap = <IconDot width={16} height={16} fill={themeStyle.accentColor} />;

  const onPressMenu = () => setShownMenu(!shownMenu);

  const onPressCancel = () => navigator.pop({animation: 'bottom'});
  const onPressItem = route => {
    setAppMode(VIEW_ROUTE);
    setCurrentRoute(route);
    moveCamera({zoomLevel, centerCoordinate: route.points[0]});
    navigator.pop({animation: 'fade'});
  };
  const Icons = (
    <Fragment>
      <RoundedIcon style={styleCancelIcon} IconComponent={IconCancelWrap} onPress={onPressCancel} />
      <RoundedIcon style={styleMenuIcon} IconComponent={IconMenuWrap} onPress={onPressMenu} />
    </Fragment>
  );

  const UserRoutes =
    isEmptyArr(routes) &&
    routes.map((route, i) => (
      <Row key={Math.random()} marginBottom={isLastPoint(i) ? 20 : 0} marginTop={20}>
        <Item
          style={styleItem}
          onPress={() => onPressItem(route)}
          IconComponent={IconDotWrap}
          text={`${route.distance} km${route.city.name && ', ' + route.city.name}`}
        />
      </Row>
    ));

  return (
    <Container backgroundColor={themeStyle.backgroundColor} width={width} height={height}>
      {Icons}
      <WrapRoutes height={width * 0.8}>
        <ScrollView style={{maxHeight: width * 0.8}}>{UserRoutes}</ScrollView>
      </WrapRoutes>
    </Container>
  );
};
export default Routes;
