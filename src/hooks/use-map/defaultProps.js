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
  animationDuration: 4000,
};

export const userLocationDefaultProps = {};

// mapbox://styles/stanislav7766/ckfmifu9v0b6r19qqkapxjgxc
// https://api.mapbox.com/styles/v1/stanislav7766/ckfmifu9v0b6r19qqkapxjgxc.html?fresh=true&title=copy&access_token=pk.eyJ1Ijoic3RhbmlzbGF2Nzc2NiIsImEiOiJja2F5N2poNzIwMTUwMnFwN3JobXk4Z2MwIn0.iJqVFpMt9AXK-N_66gMBwQ
