import styled from 'styled-components';

export const Wrapper = styled.TouchableOpacity`
  top: ${props => props.top || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  right: ${props => props.right || 'auto'};
  left: ${props => props.left || 'auto'};
  position: ${props => props.position || 'absolute'};
  justify-content: center;
  align-items: center;
  width: ${props => props.width || '51px'};
  height: ${props => props.height || '51px'};
  border-radius: 15px;
  elevation: 25;
  background-color: ${props => props.backgroundColor || '#fff'};
`;
