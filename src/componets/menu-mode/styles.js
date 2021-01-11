import {StatusBar, StyleSheet} from 'react-native';
import {NAVBAR_HEIGHT, WINDOW_HEIGHT} from '../../constants/constants';

const hasNotch = StatusBar.currentHeight > 24;
const padding = 10;

export const styles = StyleSheet.create({
  scrollView: {
    maxHeight: WINDOW_HEIGHT - NAVBAR_HEIGHT - padding * 2,
    top: NAVBAR_HEIGHT + (hasNotch ? 0 : StatusBar.currentHeight),
    marginTop: padding,
  },
});
