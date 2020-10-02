import styled from 'styled-components';
export {Row, Column, Form} from '../../constants/styles';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${props => props.backgroundColor || '#fff'};
`;

export const CenterXY = styled.View`
  margin-right: 10px;
  margin-left: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Styles = themeStyle => {
  const btnDims = {
    width: 155,
    height: 46,
    color: '#fff',
    backgroundColor: themeStyle.accentColor,
  };
  const inputStyle = {
    textColor: themeStyle.textColor,
    underlineFocusedColor: themeStyle.accentColor,
    underlineBluredColor: themeStyle.textColorSecondary,
    placeholderColor: themeStyle.textColorSecondary,
  };
  const arrowIconDims = {
    top: 0,
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

  const pickerTextStyle = {
    color: '#fff',
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 25,
  };

  return {btnDims, inputStyle, arrowIconDims, headerStyle, orangeColor, grayColor, pickerTextStyle};
};

export const pickerSizes = {
  width: 100,
  height: 200,
  itemHeight: 40,
};
export const pickerTextStyle = {
  color: '#F6A444',
};
