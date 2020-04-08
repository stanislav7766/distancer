import styled from 'styled-components';
export {Row, Column} from '../../constants/styles';
export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const Wrap = styled.View`
  margin: 5px;
`;

export const ModalStyle = styled.View`
  background-color: ${props => props.backgroundColor || '#fff'};
  padding: 20px;
  justify-content: center;
  border-radius: 15px;
`;

export const Styles = themeStyle => {
  const styleIcon = {
    right: '10px',
    top: '10px',
    width: '40px',
    height: '40px',
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  const styleItem = {
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
    height: 45,
  };
  return {styleItem, styleIcon};
};
