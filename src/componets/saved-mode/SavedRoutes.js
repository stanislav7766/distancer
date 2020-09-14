import React, {Fragment, useEffect, useContext} from 'react';
import {ScrollView} from 'react-native';
import {mapContext, appModeContext, routeContext} from '../../contexts/contexts';
import {Groove} from '../../contexts/Groove';
import Toast from 'react-native-simple-toast';
import Item from '../item/Item';
import Preview from '../preview/Preview';
import {isFilledArr} from '../../utils/isFilledArr';
import {Row, Styles} from './styles';
import {APP_MODE, WINDOW_HEIGHT, NAVBAR_HEIGHT, ERROR_OCCURRED, ROUTE_TYPES} from '../../constants/constants';
import WithActions from '../with-actions/WithActions';
import {getRoutes as _getRoutes} from '../../actions';
const {VIEW_ROUTE} = APP_MODE;
const {ROUTE} = ROUTE_TYPES;

const SavedRoutes = ({themeStyle, closeModal, getRoutes}) => {
  const {zoomLevel, cameraRef} = useContext(mapContext);
  const {setAppMode, setViewMode, setDirectionsMode} = useContext(appModeContext);
  const {moveCamera} = Groove(cameraRef);
  const {routes, setCurrentRoute, setRoutes} = useContext(routeContext);
  const maxHeight = WINDOW_HEIGHT - WINDOW_HEIGHT * 0.15 - NAVBAR_HEIGHT - 100;

  useEffect(() => {
    getRoutes()
      .then(res => {
        const {success, reason, data} = res;
        success ? setRoutes(data.routes) : Toast.show(reason);
      })
      .catch(_ => {
        //todo handle storage denied perms
        Toast.show(ERROR_OCCURRED);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {styleItem} = Styles(themeStyle);
  const routeWihoutDirections = ({directionsMode, ...route}) => route;
  const IconWrap = coords => <Preview coords={coords} />;

  const onPressItem = route => {
    setAppMode(VIEW_ROUTE);
    setViewMode(ROUTE);
    setDirectionsMode(route.directionsMode);
    setCurrentRoute(routeWihoutDirections(route));
    moveCamera({zoomLevel, centerCoordinate: route.points[0]});
    closeModal();
  };

  const isLastRoutesPoint = i => i === routes.length - 1;

  const UserRoutes = (
    <Fragment>
      {isFilledArr(routes) &&
        routes.map((el, i) => (
          <Row key={i} marginBottom={isLastRoutesPoint(i) ? 20 : 0} marginTop={20}>
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

const mapDispatchToProps = {
  getRoutes: _getRoutes,
};
export default WithActions(mapDispatchToProps)(SavedRoutes);
