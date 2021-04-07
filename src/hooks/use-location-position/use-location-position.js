import {useCallback} from 'react';
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-simple-toast';
import {getLocaleStore} from '~/stores/locale';
import {useMap} from '~/stores/map';

const {papyrusify} = getLocaleStore();

export const useLocationPosition = () => {
  const mapStore = useMap();

  const moveCamera = useCallback(
    ({zoomLevel, centerCoordinate}) => {
      if (!mapStore.cameraRef) return;

      mapStore.cameraRef.setCamera({
        centerCoordinate,
        zoomLevel,
        animationDuration: 2500,
      });
    },
    [mapStore.cameraRef],
  );
  const onPositionUpdate = useCallback(
    ({longitude, latitude}, zoomLevel) => {
      moveCamera({centerCoordinate: [longitude, latitude], zoomLevel});
    },
    [moveCamera],
  );

  const moveToCurrPosition = useCallback(
    zoomLevel => {
      Geolocation.getCurrentPosition(
        ({coords}) => onPositionUpdate(coords, zoomLevel),
        err => {
          const toast =
            err.code === 2
              ? papyrusify('gps.message.errorGpsTurnedOff')
              : err.code === 3
              ? papyrusify('common.message.tryAgain')
              : papyrusify('gps.message.errorGpsProblem');
          Toast.show(toast);
        },
        {timeout: 5000, maximumAge: 1000, enableHighAccuracy: true},
      );
    },
    [onPositionUpdate],
  );

  return {moveToCurrPosition, moveCamera};
};
