import styled from 'styled-components';

export const Container = styled.View`
  width: 100%;
  margin-top: 10px;
`;

export const TextInputStyled = styled.TextInput`
  color: ${props => props.textColor || '#000'};
  height: 42px;
  font-size: 17px;
`;
export const Underline = styled.View`
  border-bottom-width: 3px;
  border-bottom-color: ${props => props.borderBottomColor || 'black'};
  elevation: 16;
`;
