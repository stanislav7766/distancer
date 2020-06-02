import React, {Fragment, useEffect, useContext} from 'react';
import {ScrollView} from 'react-native';
import {mapContext, appModeContext, routeContext} from '../../contexts/contexts';
import {Groove} from '../../contexts/Groove';
import Toast from 'react-native-simple-toast';
import Item from '../item/Item';
import Preview from '../preview/Preview';
import {readRoutes} from '../../utils/fs';
import {isFilledArr} from '../../utils/isFilledArr';
import {Row, Styles} from './styles';
import {APP_MODE, WINDOW_HEIGHT, NAVBAR_HEIGHT, ERROR_OCCURRED, ROUTES_LIST_EMPTY} from '../../constants/constants';
const {VIEW_ROUTE} = APP_MODE;

const SavedMode = ({themeStyle, closeModal}) => {
  const {zoomLevel, cameraRef} = useContext(mapContext);
  const {setAppMode, setDirectionsMode} = useContext(appModeContext);
  const {moveCamera} = Groove(cameraRef);
  const {routes, setCurrentRoute, setRoutes} = useContext(routeContext);
  const maxHeight = WINDOW_HEIGHT - WINDOW_HEIGHT * 0.15 - NAVBAR_HEIGHT - 20;

  useEffect(() => {
    (async () => {
      try {
        const _routes = await readRoutes();
        isFilledArr(_routes) ? setRoutes(_routes) : Toast.show(ROUTES_LIST_EMPTY);
      } catch (error) {
        Toast.show(ERROR_OCCURRED);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {styleItem} = Styles(themeStyle);
  const routeWihoutDirections = ({directionsMode, ...route}) => route;
  const IconWrap = coords => <Preview coords={coords} />;

  const onPressItem = route => {
    setAppMode(VIEW_ROUTE);
    setDirectionsMode(route.directionsMode);
    setCurrentRoute(routeWihoutDirections(route));
    moveCamera({zoomLevel, centerCoordinate: route.points[0]});
    closeModal();
  };
  const isLastPoint = i => i === routes.length - 1;

  const UserRoutes = (
    <Fragment>
      {isFilledArr(routes) &&
        routes.map((el, i) => (
          <Row key={i} marginBottom={isLastPoint(i) ? 20 : 0} marginTop={20}>
            <Item
              style={styleItem}
              onPress={() => onPressItem(el)}
              IconComponent={IconWrap(el.points)}
              text={`${el.distance} km${el.city.name && ', ' + el.city.name}`}
            />
          </Row>
        ))}
    </Fragment>
  );

  return <ScrollView style={{maxHeight}}>{UserRoutes}</ScrollView>;
};

export default SavedMode;
