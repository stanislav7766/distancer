import React, {useEffect, useContext, Fragment} from 'react';
import {Dimensions, BackHandler} from 'react-native';
import MapboxGL, {MapView, UserLocation, Camera} from '@react-native-mapbox-gl/maps';
import {mapContext, routeContext, themeContext, appModeContext, modalContext} from '../../contexts/contexts';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import MapRoute from '../map-route/MapRoute';
import askPermissions from './askPermissions';
import Toast from 'react-native-simple-toast';
import {Groove} from '../../contexts/Groove';
import IconCancel from '../svg-icons/icon-cancel/IconCancel';
import IconMenu from '../svg-icons/icon-menu/IconMenu';
import IconGps from '../svg-icons/icon-gps/IconGps';
import {Container, Styles} from './styles';
import {APP_MODE} from '../../constants/constants';
import {MAP_TOKEN} from 'react-native-dotenv';

const {height, width} = Dimensions.get('window');
const {BASIC_VIEW, DRAW_ROUTE, VIEW_ROUTE} = APP_MODE;

MapboxGL.setAccessToken(MAP_TOKEN);

const Map = () => {
  const {theme, getThemeStyle} = useContext(themeContext);
  const {dragMode, setDragMode, expanded, shownMenu, setShownMenu} = useContext(modalContext);
  const {appMode, setAppMode} = useContext(appModeContext);
  const {setCameraRef, zoomLevel, coordinates, cameraRef} = useContext(mapContext);
  const {setDefaultRoute, currentRoute, setCurrentRoute} = useContext(routeContext);
  const themeStyle = getThemeStyle(theme);
  const {moveToCurrPosition} = Groove(cameraRef);
  const {points} = currentRoute;

  const {styleCancelIcon, styleGpsIcon, styleMenuIcon} = Styles(themeStyle, height);

  const IconCancelWrap = <IconCancel width={46} height={46} fill={themeStyle.accentColorSecondary} />;
  const IconMenuWrap = <IconMenu width={26} height={20} fill={themeStyle.accentColor} />;
  const IconGpsWrap = <IconGps width={32} height={32} fill={themeStyle.accentColor} />;

  useEffect(() => {
    (async () => {
      const res = await askPermissions();
      if (res) {
        Toast.show('Location permissions granted');
        MapboxGL.setTelemetryEnabled(false);
      } else {
        Toast.show('Location permissions denied');
        Toast.show('Allow permissions in settings');
        BackHandler.exitApp();
      }
    })();
  }, []);

  const appModeCall = mode =>
    ({
      [DRAW_ROUTE]: () => {
        setDefaultRoute();
        setAppMode(BASIC_VIEW);
        setDragMode(false);
      },
      [VIEW_ROUTE]: () => {
        setDefaultRoute();
        setAppMode(BASIC_VIEW);
      },
    }[mode]());

  const onPressMenu = () => setShownMenu(!shownMenu);
  const onPressCancel = () => appModeCall(appMode);
  const onPressMap = info => {
    const {coordinates: coords} = info.geometry;
    appMode === DRAW_ROUTE && !dragMode && setCurrentRoute({...currentRoute, points: [...points, coords]});
  };

  const Icons = (
    <Fragment>
      {!expanded && (
        <RoundedIcon style={styleGpsIcon} IconComponent={IconGpsWrap} onPress={() => moveToCurrPosition(zoomLevel)} />
      )}
      {/* {!expanded && <RoundedIcon style={styleInfoIcon} IconComponent={IconInfoWrap} />} */}
      {appMode !== BASIC_VIEW && !expanded && (
        <RoundedIcon style={styleCancelIcon} IconComponent={IconCancelWrap} onPress={onPressCancel} />
      )}
      <RoundedIcon style={styleMenuIcon} IconComponent={IconMenuWrap} onPress={onPressMenu} />
    </Fragment>
  );

  return (
    <Container height={height} width={width}>
      <MapView
        onPress={onPressMap}
        styleURL={MapboxGL.StyleURL.Street}
        style={styleMap}
        attributionEnabled={false}
        logoEnabled={false}
        compassEnabled={false}
      >
        <Camera ref={setCameraRef} zoomLevel={zoomLevel} centerCoordinate={coordinates} followZoomLevel={zoomLevel} />
        {(appMode === DRAW_ROUTE || appMode === VIEW_ROUTE) && <MapRoute />}
        <UserLocation />
      </MapView>
      {Icons}
    </Container>
  );
};
export default Map;

const styleMap = {
  flex: 1,
};
