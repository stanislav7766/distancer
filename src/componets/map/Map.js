import React, {useEffect, useContext, Fragment} from 'react';
import {Dimensions, BackHandler, View} from 'react-native';
import MapboxGL, {MapView, UserLocation, Camera} from '@react-native-mapbox-gl/maps';
import {mapContext, routeContext, themeContext, appModeContext, modalContext} from '../../contexts/contexts';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import MapRoute from '../map-route/MapRoute';
import askPermissions from './askPermissions';
import Toast from 'react-native-simple-toast';
import {Groove} from '../../contexts/Groove';
import IconInfo from '../svg-icons/icon-info/IconInfo';
import IconGps from '../svg-icons/icon-gps/IconGps';
import {styleContainer, styleMap, Styles} from './styles';
import {APP_MODE} from '../../constants/constants';
import {MAP_TOKEN} from 'react-native-dotenv';
import {FetchDirections} from '../../utils/directions';
import {isFilledArr} from '../../utils/isFilledArr';
const {height, width} = Dimensions.get('window');
const {VIEW_ROUTE, DRAW_MODE} = APP_MODE;

MapboxGL.setAccessToken(MAP_TOKEN);

const Map = () => {
  const {theme, getThemeStyle} = useContext(themeContext);
  const {dragMode, expanded} = useContext(modalContext);
  const {appMode, isDirectionsMode} = useContext(appModeContext);
  const {setCameraRef, zoomLevel, coordinates, cameraRef} = useContext(mapContext);
  const {currentRoute, setCurrentRoute} = useContext(routeContext);
  const themeStyle = getThemeStyle(theme);
  const {moveToCurrPosition} = Groove(cameraRef);
  const {points} = currentRoute;
  const setRoute = coords => setCurrentRoute({...currentRoute, points: coords});
  const fetchDirections = startend =>
    FetchDirections(startend).then(
      coords => isFilledArr(coords) && setRoute([...points, ...coords]),
      error => {
        Toast.show(
          error.message === 'Network request failed' ? 'Network request failed' : 'An error occurred. Try later',
        );
      },
    );
  const isDrawMode = appMode === DRAW_MODE && !dragMode && !isDirectionsMode;
  const isDrawDirectionsMode = isDirectionsMode && !dragMode;
  const {styleInfoIcon, styleGpsIcon} = Styles(themeStyle, height);

  const IconGpsWrap = <IconGps width={32} height={32} fill={themeStyle.accentColor} />;
  const IconInfoWrap = <IconInfo width={32} height={32} fill={themeStyle.accentColor} />;

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

  const onPressMap = info => {
    const {coordinates: coords} = info.geometry;
    isDrawDirectionsMode &&
      (isFilledArr(points) ? fetchDirections([points.slice(-1)[0], coords]) : setRoute([...points, coords]));
    isDrawMode && setRoute([...points, coords]);
  };

  const Icons = (
    <Fragment>
      <RoundedIcon style={styleGpsIcon} IconComponent={IconGpsWrap} onPress={() => moveToCurrPosition(zoomLevel)} />
      <RoundedIcon style={styleInfoIcon} IconComponent={IconInfoWrap} />
    </Fragment>
  );

  return (
    <View style={[styleContainer, {height, width}]}>
      <MapView
        onPress={onPressMap}
        styleURL={MapboxGL.StyleURL.Street}
        style={styleMap}
        attributionEnabled={false}
        logoEnabled={false}
        compassEnabled={false}
      >
        <Camera ref={setCameraRef} zoomLevel={zoomLevel} centerCoordinate={coordinates} followZoomLevel={zoomLevel} />
        {(appMode === DRAW_MODE || appMode === VIEW_ROUTE) && <MapRoute />}
        <UserLocation />
      </MapView>
      {(!expanded || appMode === DRAW_MODE) && Icons}
    </View>
  );
};
export default Map;
