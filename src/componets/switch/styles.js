import {StyleSheet} from 'react-native';

export const getCircleStyle = ({size, backgroundColor}) => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor,
});

export const getContainerStyle = ({width, height, backgroundColor}) => ({
  width,
  height,
  backgroundColor,
  padding: 5,
  borderRadius: height / 2,
});

export const styles = StyleSheet.create({
  container: {},
  icon: {position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'},
  circle: {position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, justifyContent: 'center'},
});

export const getPadding = size => size * 0.1;
export const getCircleSize = size => size * 0.8;
