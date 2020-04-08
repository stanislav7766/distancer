import styled from 'styled-components';

export const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  border-radius: 15px;
  elevation: 12;
  background-color: ${props => props.backgroundColor || 'white'};
`;

export const ButtonText = styled.Text`
  font-size: 22px;
  color: ${props => props.textColor || 'white'};
  text-align: center;
`;
