import React, {useEffect} from 'react';
import {View} from 'react-native';
import MapboxGL, {MapView, UserLocation, Camera} from '@react-native-mapbox-gl/maps';
import {styles} from './styles';
import {MAP_TOKEN} from 'react-native-dotenv';
import {mapViewDefaultProps, cameraDefaultProps, userLocationDefaultProps} from './defaultProps';

MapboxGL.setAccessToken(MAP_TOKEN);

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
