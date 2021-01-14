import {styles} from './styles';

export const mapViewDefaultProps = {
  localizeLabels: true,
  onPress: () => {},
  styleURL: 'mapbox://styles/stanislav7766/ckfmifu9v0b6r19qqkapxjgxc',
  style: styles.mapView,
  attributionEnabled: false,
  logoEnabled: false,
  compassEnabled: false,
};
export const cameraDefaultProps = {
  zoomLevel: 14,
  centerCoordinate: [30.5238, 50.45466],
  followZoomLevel: 14,
};

export const userLocationDefaultProps = {};
