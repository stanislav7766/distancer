import styled from 'styled-components';
export const Styles = ({itemHeight, offsetTop, offsetHeight}) => {
  const highlightStyleDefault = {
    position: 'absolute',
    top: offsetTop,
    height: itemHeight,
    width: '100%',
    borderTopColor: '#d8d8d8',
    borderBottomColor: '#d8d8d8',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  };
  const offsetStyle = {height: offsetHeight, flex: 1};
  return {highlightStyleDefault, offsetStyle};
};
export const textStyleDefault = {fontSize: 20, lineHeight: 26, textAlign: 'center', color: '#000'};

export const Container = styled.View`
  flex: 1;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  overflow: hidden;
  justify-content: center;
  background-color: ${props => props.backgroundColor || '#fff'};
`;

export const SelectedItem = styled.View`
  justify-content: center;
  align-items: center;
  height: ${props => props.itemHeight || 40}px;
`;
