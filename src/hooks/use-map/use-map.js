import React, {useEffect} from 'react';
import {View} from 'react-native';
import MapboxGL, {MapView, UserLocation, Camera, Logger} from '@react-native-mapbox-gl/maps';
import {styles} from './styles';
import {MAP_TOKEN} from 'react-native-dotenv';
import {mapViewDefaultProps, cameraDefaultProps, userLocationDefaultProps} from './defaultProps';

MapboxGL.setAccessToken(MAP_TOKEN);

Logger.setLogCallback(log => {
  const {message} = log;

  return (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  );
});

const useMap = ({mapViewProps, cameraProps, userLocationProps, mapStyle, mapViewChildren}) => {
  const _mapViewProps = {...mapViewDefaultProps, ...(mapViewProps ?? {})};
  const _cameraProps = {...cameraDefaultProps, ...(cameraProps ?? {})};
  const _userLocationProps = {...userLocationDefaultProps, ...(userLocationProps ?? {})};

  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  const Map = (
    <View style={[styles.map, mapStyle]}>
      <MapView {..._mapViewProps}>
        <Camera {..._cameraProps} />
        <UserLocation {..._userLocationProps} />
        {mapViewChildren}
      </MapView>
    </View>
  );
  return [Map];
};

export default useMap;
