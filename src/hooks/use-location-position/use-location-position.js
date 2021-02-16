import {useCallback} from 'react';
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-simple-toast';
import {ERROR_TRY_AGAIN, ERROR_GPS_TURNED_OFF, ERROR_GPS_PROBLEM} from '~/constants/constants';

export const useLocationPosition = cameraRef => {
  const moveCamera = useCallback(
    ({zoomLevel, centerCoordinate}) => {
      if (!cameraRef) return;

      cameraRef.setCamera({
        centerCoordinate,
        zoomLevel,
        animationDuration: 2500,
      });
    },
    [cameraRef],
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
          const toast = err.code === 2 ? ERROR_GPS_TURNED_OFF : err.code === 3 ? ERROR_TRY_AGAIN : ERROR_GPS_PROBLEM;
          Toast.show(toast);
        },
        {timeout: 5000, maximumAge: 1000, enableHighAccuracy: true},
      );
    },
    [onPositionUpdate],
  );

  return {moveToCurrPosition, moveCamera};
};
