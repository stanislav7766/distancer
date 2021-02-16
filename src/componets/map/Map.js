import React from 'react';
import {Dimensions, View} from 'react-native';
import {useTheme} from '~/stores/theme';
import {RoundedIcon} from '~/componets/rounded-icon';
import {MappedRoute, LiveRoute} from '~/componets/mapped-route';
import {useLocationPosition} from '~/hooks/use-location-position';
import {DirectionsBar} from '~/componets/directions-bar';
import useSvgFactory from '~/hooks/use-svg-factory';
import {getInfo} from '~/assets/svg-icons/info';
import {getGps} from '~/assets/svg-icons/gps';
import {Styles, mapStyle, styleContainer} from './styles';
import {APP_MODE, CURRENT_POSITION_ZOOM} from '~/constants/constants';
import {default as useMapBox} from '~/hooks/use-map';
import {usePressDrawMode} from '~/hooks/use-press-map';
import {observer} from 'mobx-react-lite';
import {useAppMode} from '~/stores/app-mode';
import {useMap} from '~/stores/map';
import {useCurrentRoute} from '~/stores/current-route';
import {useDirectionsMode} from '~/stores/directions-mode';

const {height} = Dimensions.get('window');
const {DRAW_MODE, LIVE_MODE} = APP_MODE;

const iconParams = {width: 32, height: 32};

const Map = () => {
  const {themeStyle} = useTheme();
  const {appMode, liveWithRoute, dragMode} = useAppMode();
  const {
    pushPoints,
    currentRoute: {points},
  } = useCurrentRoute();
  const {isDirectionsMode, directionsMode} = useDirectionsMode();
  const {setCameraRef, setMapRef, zoomLevel, centerCoordinate, cameraRef, showMapIcons} = useMap();
  const {moveToCurrPosition} = useLocationPosition(cameraRef);

  const [onPressInDrawMode] = usePressDrawMode({
    dragMode,
    points,
    pushPoints,
    isDirectionsMode,
    directionsMode,
  });

  const {styleInfoIcon, styleGpsIcon} = Styles(themeStyle, height);
  const IconGps = useSvgFactory(getGps, {...iconParams, fillAccent: themeStyle.accentColor});
  const IconInfo = useSvgFactory(getInfo, {...iconParams, fillAccent: themeStyle.accentColor});

  const isDrawMode = appMode === DRAW_MODE;
  const isLiveMode = appMode === LIVE_MODE;
  const showMapRoute = isDrawMode || (isLiveMode && liveWithRoute);
  const showLiveMode = isLiveMode;

  const onPressMap = info => {
    isDrawMode && onPressInDrawMode(info);
  };

  const Directions = <DirectionsBar themeStyle={themeStyle} />;
  const Icons = showMapIcons && (
    <>
      <RoundedIcon
        style={styleGpsIcon}
        IconComponent={IconGps}
        onPress={() => moveToCurrPosition(CURRENT_POSITION_ZOOM)}
      />
      <RoundedIcon style={styleInfoIcon} IconComponent={IconInfo} />
    </>
  );
  const mapViewProps = {
    onPress: onPressMap,
    ref: setMapRef,
  };
  const cameraProps = {
    ref: setCameraRef,
    zoomLevel,
    centerCoordinate,
    followZoomLevel: zoomLevel,
  };
  const mapViewChildren = (
    <>
      {showMapRoute && <MappedRoute />}
      {showLiveMode && <LiveRoute />}
    </>
  );
  const [MapView] = useMapBox({mapStyle, mapViewProps, cameraProps, mapViewChildren});
  return (
    <View style={styleContainer}>
      {MapView}
      {Icons}
      {Directions}
    </View>
  );
};
export default observer(Map);
