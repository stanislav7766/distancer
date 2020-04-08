import styled from 'styled-components';

export const Container = styled.View`
  width: auto;
  margin-top: 30px;
`;

export const TextStyled = styled.Text`
  height: 30px;
  color: ${props => props.textColor || '#000'};
  font-size: 17px;
`;
export const Underline = styled.View`
  min-width: 70px;
  border-bottom-width: 3px;
  border-bottom-color: ${props => props.borderBottomColor || 'black'};
  elevation: 16;
`;
