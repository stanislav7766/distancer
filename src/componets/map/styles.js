import styled from 'styled-components';

export const Container = styled.View`
  height: ${props => props.height || '300'}px;
  width: ${props => props.width || '300'}px;
`;

export const Styles = (themeStyle, height) => {
  const styleGpsIcon = {
    right: '10px',
    bottom: `${height * 0.25}px`,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  const styleInfoIcon = {
    left: '10px',
    bottom: `${height * 0.25}px`,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
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
  return {styleCancelIcon, styleGpsIcon, styleInfoIcon, styleMenuIcon};
};
