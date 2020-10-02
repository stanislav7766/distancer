import React, {useEffect, useContext, Fragment} from 'react';
import {Dimensions, BackHandler, View} from 'react-native';
import MapboxGL, {MapView, UserLocation, Camera} from '@react-native-mapbox-gl/maps';
import {
  mapContext,
  routeContext,
  themeContext,
  appModeContext,
  modalContext,
  liveRouteContext,
} from '../../contexts/contexts';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import MapRoute from '../map-route/MapRoute';
import LiveRoute from '../map-route/LiveRoute';
import askPermissions from './askPermissions';
import Toast from 'react-native-simple-toast';
import {Groove} from '../../contexts/Groove';
import DirectionsBar from '../directions-bar/DirectionsBar';
import IconInfo from '../svg-icons/icon-info/IconInfo';
import IconGps from '../svg-icons/icon-gps/IconGps';
import {styleContainer, styleMap, Styles} from './styles';
import {APP_MODE} from '../../constants/constants';
import {MAP_TOKEN} from 'react-native-dotenv';
import {FetchDirections} from '../../utils/directions';
import {isFilledArr} from '../../utils/isFilledArr';
import {
  ERROR_OCCURRED,
  ERROR_NETWORK_FAILED,
  GPS_ALLOW_PERMISSIONS,
  GPS_PERMISSIONS_DENIED,
  GPS_PERMISSIONS_GRANTED,
  LIVE_SPECS_DEFAULT,
  ROUTE_TYPES,
} from '../../constants/constants';
import {measureDistance} from '../../utils/measureDistanceCoords';
import {timeToSec, kmToM, calcPace} from '../../utils/timeToSec';

const {height, width} = Dimensions.get('window');
const {VIEW_ROUTE, DRAW_MODE, LIVE_MODE} = APP_MODE;
const {ACTIVITY, ROUTE} = ROUTE_TYPES;
MapboxGL.setAccessToken(MAP_TOKEN);

const Map = () => {
  const {theme, getThemeStyle} = useContext(themeContext);
  const {dragMode, expanded} = useContext(modalContext);
  const {appMode, viewMode, isDirectionsMode, directionsMode, setDirectionsMode} = useContext(appModeContext);
  const {setCameraRef, zoomLevel, coordinates, cameraRef} = useContext(mapContext);
  const {liveRoute, setLiveRoute} = useContext(liveRouteContext);
  const {points1, movingTime} = liveRoute;
  const {currentRoute, setCurrentRoute} = useContext(routeContext);
  const themeStyle = getThemeStyle(theme);
  const {moveToCurrPosition} = Groove(cameraRef);
  const {points, inLive} = currentRoute;
  const setRoute = coords => setCurrentRoute({points: coords});
  const fetchDirections = startend =>
    FetchDirections(startend, directionsMode).then(
      coords => isFilledArr(coords) && setRoute([...points, ...coords]),
      error => {
        Toast.show(error.message === ERROR_NETWORK_FAILED ? ERROR_NETWORK_FAILED : `${ERROR_OCCURRED}. Try later`);
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
        Toast.show(GPS_PERMISSIONS_GRANTED);
        MapboxGL.setTelemetryEnabled(false);
      } else {
        Toast.show(GPS_PERMISSIONS_DENIED);
        Toast.show(GPS_ALLOW_PERMISSIONS);
        BackHandler.exitApp();
      }
    })();
  }, []);

  useEffect(() => {
    const distance = measureDistance(points1);
    const avgSpeed =
      distance === 0 ? LIVE_SPECS_DEFAULT.avgSpeed : (3.6 * (kmToM(distance) / timeToSec(movingTime))).toFixed(1);
    const pace = calcPace(distance, movingTime);
    setLiveRoute({
      distance,
      avgSpeed,
      pace,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points1]);

  const onPressMap = info => {
    const {coordinates: coords} = info.geometry;
    isDrawDirectionsMode &&
      (isFilledArr(points) ? fetchDirections([points.slice(-1)[0], coords]) : setRoute([...points, coords]));
    isDrawMode && setRoute([...points, coords]);
  };
  //todo moveToCurrPosition need rewriting
  const Icons = (
    <Fragment>
      <RoundedIcon style={styleGpsIcon} IconComponent={IconGpsWrap} onPress={() => moveToCurrPosition(zoomLevel)} />
      <RoundedIcon style={styleInfoIcon} IconComponent={IconInfoWrap} />
    </Fragment>
  );
  const isViewRoute = appMode === VIEW_ROUTE && viewMode === ROUTE;
  const isViewActivity = appMode === VIEW_ROUTE && viewMode === ACTIVITY;
  // mapbox://styles/stanislav7766/ckfmifu9v0b6r19qqkapxjgxc
  // https://api.mapbox.com/styles/v1/stanislav7766/ckfmifu9v0b6r19qqkapxjgxc.html?fresh=true&title=copy&access_token=pk.eyJ1Ijoic3RhbmlzbGF2Nzc2NiIsImEiOiJja2F5N2poNzIwMTUwMnFwN3JobXk4Z2MwIn0.iJqVFpMt9AXK-N_66gMBwQ
  return (
    <View style={[styleContainer, {height, width}]}>
      <MapView
        localizeLabels={true}
        onPress={onPressMap}
        styleURL={'mapbox://styles/stanislav7766/ckfmifu9v0b6r19qqkapxjgxc'}
        style={styleMap}
        attributionEnabled={false}
        logoEnabled={false}
        compassEnabled={false}
      >
        <Camera ref={setCameraRef} zoomLevel={zoomLevel} centerCoordinate={coordinates} followZoomLevel={zoomLevel} />
        {(appMode === DRAW_MODE || isViewRoute || inLive) && <MapRoute />}
        {(appMode === LIVE_MODE || isViewActivity) && <LiveRoute />}
        <UserLocation />
      </MapView>
      {(!expanded || appMode === DRAW_MODE) && Icons}
      {isDirectionsMode && <DirectionsBar setMode={setDirectionsMode} themeStyle={themeStyle} />}
    </View>
  );
};
export default Map;
