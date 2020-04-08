import styled from 'styled-components';
import {Row, Column} from '../../constants/styles';
export {Row, Column};

export const TextKM = styled.Text`
  color: ${props => props.textColor || '#fff'};
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px;
`;

export const Styles = themeStyle => {
  const styleTextUnderline = {
    textColor: themeStyle.textColorSecondary,
    underlineBluredColor: themeStyle.textColorSecondary,
  };
  return {styleTextUnderline};
};
