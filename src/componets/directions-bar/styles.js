import {StyleSheet} from 'react-native';

export const Styles = themeStyle => {
  const styleDirections = {
    flexDirection: 'row',
    minWidth: 150,
    right: 10,
    top: 10,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };

  return {styleDirections};
};

export const styles = StyleSheet.create({
  carIcon: {
    position: 'relative',
    left: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  manIcon: {
    position: 'relative',
    backgroundColor: 'transparent',
    elevation: 0,
  },
  bikeIcon: {
    position: 'relative',
    right: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  },
});
