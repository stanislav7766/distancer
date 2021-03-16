import {StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '~/constants/constants';
import {btnContainerStyle, btnTextStyle} from '~/constants/styles';
export {Row, mx0, Column, mt10} from '~/constants/styles';

const centerXY = {flex: 1, justifyContent: 'center', alignItems: 'center'};

export const styles = StyleSheet.create({
  pickerText: {color: '#F6A444'},
  windowText: {color: '#8d8d8d', textAlign: 'center', fontWeight: 'normal', fontSize: 18},
  windowTextWrap: {minHeight: 100, ...centerXY},
  textInputHeader: {marginTop: 10},
  inputConfirmContainer: {flex: 1, minHeight: 100},
  centerXY,
  preview: {
    width: WINDOW_WIDTH * 0.65,
    height: (WINDOW_WIDTH * 0.65) / 3,
  },
  notFinishedHeader: {color: '#8d8d8d', textAlign: 'center', fontWeight: 'normal', fontSize: 20},
});

export const pickerSizes = {
  width: 100,
  height: 200,
  itemHeight: 40,
};

export const windowWidth = WINDOW_WIDTH * 0.8;

export const Styles = themeStyle => {
  const inputStyle = {
    textColor: themeStyle.textColorThird,
    underlineFocusedColor: themeStyle.accentColor,
    underlineBluredColor: themeStyle.textColorSecondary,
    placeholderColor: themeStyle.textColorSecondary,
  };
  const styleItemActivity = {
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
    width: WINDOW_WIDTH * 0.65,
    height: 30,
    fontSize: 12,
    alignSelf: 'center',
  };

  return {inputStyle, styleItemActivity};
};

export const btnStyles = {
  containerStyle: {...btnContainerStyle, height: 40},
  textStyle: btnTextStyle,
};
