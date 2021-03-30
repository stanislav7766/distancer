import styled from 'styled-components';
import {ACCENT_BLUE} from '~/constants/constants';
export {Row, Column, mx0} from '~/constants/styles';

export const Styles = themeStyle => {
  const styleBar = {
    flexDirection: 'row',
    minWidth: 150,
    right: 10,
    top: 10,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };

  return {styleBar};
};

export const Count = styled.Text`
  color: ${props => props.textColor ?? ACCENT_BLUE};
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: ${props => props.fontSize ?? 17}px;
`;
