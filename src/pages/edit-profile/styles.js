import styled from 'styled-components';
import {btnContainerStyle, btnTextStyle} from '../../constants/styles';
export {Row, Column, Form, mt10} from '../../constants/styles';

export const mt20 = {
  marginTop: 20,
};
export const mt30 = {
  marginTop: 30,
};
export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${props => props.backgroundColor || '#fff'};
`;

export const ContainerPickers = styled.View`
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const CenterXY = styled.View`
  margin-right: 10px;
  margin-left: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const {width: _, ...btnContStyle} = btnContainerStyle;

export const Styles = themeStyle => {
  const inputStyle = {
    textColor: themeStyle.textColor,
    underlineFocusedColor: themeStyle.accentColor,
    underlineBluredColor: themeStyle.textColorSecondary,
    placeholderColor: themeStyle.textColorSecondary,
  };
  const arrowIconDims = {
    top: -10,
    left: 0,
    backgroundColor: themeStyle.backgroundColorSecondary,
    position: 'absolute',
  };
  const headerStyle = {
    fontSize: 20,
    color: themeStyle.textColorSecondary,
  };

  const orangeColor = {
    color: '#F6A444',
  };
  const grayColor = {
    color: themeStyle.textColorSecondary,
  };

  return {inputStyle, arrowIconDims, headerStyle, orangeColor, grayColor};
};

export const btnSaveStyles = {
  containerStyle: {
    ...btnContStyle,
    height: 40,
  },
  textStyle: btnTextStyle,
};

export const pickerSizes = {
  width: 100,
  height: 200,
  itemHeight: 40,
};
export const pickerTextStyle = {
  color: '#fff',
  fontFamily: 'Noto Sans',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 18,
  lineHeight: 25,
};
