import React, {useEffect, useContext, useCallback} from 'react';
import VirtualList from '../virtualized-list';
import {mapContext, appModeContext, routeContext} from '../../contexts/contexts';
import {Groove} from '../../contexts/Groove';
import Toast from 'react-native-simple-toast';
import Item from '../item/Item';
import Preview from '../preview/Preview';
import {Row, Styles, mt20, mb20} from './styles';
import {APP_MODE, ERROR_OCCURRED, ROUTE_TYPES} from '../../constants/constants';
import WithActions from '../with-actions/WithActions';
import {getRoutes as _getRoutes} from '../../actions';
import useSpinner from '../spinner/useSpinner';
import {useOnIsDirectionsMode} from '../../hooks/use-directions-mode';
import {observer} from 'mobx-react-lite';
import {useDirectionsMode} from '../../stores/directions-mode';

const {VIEW_ROUTE} = APP_MODE;
const {ROUTE} = ROUTE_TYPES;

const SavedRoutes = ({themeStyle, getRoutes}) => {
  const {setLoading, isLoading} = useSpinner({position: 'top'});
  const {zoomLevel, cameraRef} = useContext(mapContext);
  const {setAppMode, setViewMode} = useContext(appModeContext);
  const {setDirectionsMode} = useDirectionsMode();
  const {moveCamera} = Groove(cameraRef);
  const {routes, setCurrentRoute, setRoutes, setDefaultRoutes} = useContext(routeContext);
  useOnIsDirectionsMode({mount: false});

  const onRefresh = useCallback(() => {
    setLoading(true);
    getRoutes()
      .then(res => {
        const {success, reason, data} = res;
        success ? setRoutes(data.routes) : Toast.show(reason);
      })
      .catch(_ => {
        Toast.show(ERROR_OCCURRED);
      })
      .finally(_ => {
        setLoading(false);
      });
  }, [getRoutes, setLoading, setRoutes]);

  useEffect(() => {
    setTimeout(onRefresh, 700);
  }, [onRefresh]);

  useEffect(() => {
    setDefaultRoutes();
  }, [setDefaultRoutes]);

  const {styleItemRoute} = Styles(themeStyle);
  const routeWihoutDirections = ({directionsMode, ...route}) => route;
  const IconWrap = coords => <Preview coords={coords} />;

  const onPressItem = route => {
    setAppMode(VIEW_ROUTE);
    setViewMode(ROUTE);
    setDirectionsMode(route.directionsMode);
    setCurrentRoute(routeWihoutDirections(route));
    moveCamera({zoomLevel, centerCoordinate: route.points[0]});
  };

  const Footer = <Row {...mb20} />;

  const renderItem = ({item}) => (
    <Row {...mt20}>
      <Item
        style={styleItemRoute}
        onPress={() => onPressItem(item)}
        IconComponent={IconWrap(item.points)}
        text={`${item.distance} km`}
      />
    </Row>
  );

  return (
    <VirtualList
      refresh={{refreshing: isLoading, onRefresh}}
      renderItem={renderItem}
      Footer={Footer}
      items={routes}
      initialNumToRender={10}
      keyExtractor={item => item.id}
    />
  );
};

const mapDispatchToProps = {
  getRoutes: _getRoutes,
};
export default WithActions(mapDispatchToProps)(observer(SavedRoutes));
