import Geolocation from '@react-native-community/geolocation';

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
    Geolocation.getCurrentPosition(({coords}) => onPositionUpdate(coords));
  };

  return {moveToCurrPosition, moveCamera};
};
