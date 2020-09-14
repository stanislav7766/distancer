import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-simple-toast';
import {ERROR_OCCURRED, ERROR_TRY_AGAIN, ERROR_GPS_TURNED_OFF} from '../constants/constants';

export const Groove = cameraRef => {
  const moveCamera = ({zoomLevel, centerCoordinate}) => {
    if (!cameraRef) {
      return;
    }

    cameraRef.setCamera({
      centerCoordinate,
      zoomLevel,
      animationDuration: 1500,
    });
  };

  const moveToCurrPosition = zoomLevel => {
    const onPositionUpdate = ({longitude, latitude}) => {
      moveCamera({centerCoordinate: [longitude, latitude], zoomLevel});
    };
    Geolocation.getCurrentPosition(
      ({coords}) => onPositionUpdate(coords),
      err => {
        const toast = err.code === 2 ? ERROR_GPS_TURNED_OFF : err.code === 3 ? ERROR_TRY_AGAIN : ERROR_OCCURRED;
        Toast.show(toast);
      },
      {timeout: 3000},
    );
  };

  return {moveToCurrPosition, moveCamera};
};
