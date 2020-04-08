import styled from 'styled-components';
export {Row} from '../../constants/styles';

export const Container = styled.View`
  flex: 1;
  height: ${props => props.height || '300'}px;
  width: ${props => props.width || '300'}px;
  background-color: ${props => props.backgroundColor || '#fff'};
  background: rgba(0, 0, 0, 0.45);
  align-items: center;
  justify-content: center;
`;
export const WrapRoutes = styled.View`
  max-height: ${props => `${props.height}px` || 'auto'};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Styles = themeStyle => {
  const styleMenuIcon = {
    left: '10px',
    top: '10px',
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  const styleCancelIcon = {
    right: '10px',
    top: '10px',
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  const styleItem = {
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
  };
  return {styleMenuIcon, styleItem, styleCancelIcon};
};
