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
  const arrowIconDims = {
    top: '10px',
    left: '0px',
    backgroundColor: themeStyle.backgroundColorSecondary,
    position: 'relative',
  };
  const dragIconDims = {
    top: '10px',
    left: '10px',
    backgroundColor: themeStyle.backgroundColorSecondary,
    position: 'relative',
  };
  return {arrowIconDims, dragIconDims};
};
