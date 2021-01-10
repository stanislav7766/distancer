import {Animated} from '@react-native-mapbox-gl/maps';

export const makeShape = (type, coordinates) =>
  new Animated.Shape({
    type,
    coordinates,
  });
