import {StatusBar, StyleSheet} from 'react-native';

const hasNotch = StatusBar.currentHeight > 24;
const padding = 10;

export const styles = StyleSheet.create({
  scrollView: {
    marginTop: hasNotch ? 0 : StatusBar.currentHeight,
    top: padding,
  },
});
