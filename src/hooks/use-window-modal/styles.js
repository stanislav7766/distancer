import {StyleSheet} from 'react-native';
import {ACCENT_BLUE, WINDOW_WIDTH} from '../../constants/constants';

const centerXY = {flex: 1, justifyContent: 'center', alignItems: 'center'};

export const styles = StyleSheet.create({
  pickerText: {color: '#F6A444'},
  windowText: {color: '#8d8d8d', textAlign: 'center', fontWeight: 'normal', fontSize: 18},
  windowTextWrap: {minHeight: 100, ...centerXY},
});

export const pickerSizes = {
  width: 100,
  height: 200,
  itemHeight: 40,
};

export const windowWidth = WINDOW_WIDTH * 0.8;