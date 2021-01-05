import styled from 'styled-components';

const isDefined = value => value !== undefined;

export const Container = styled.TouchableOpacity`
  top: ${props => (isDefined(props.top) ? props.top + 'px' : 'auto')};
  bottom: ${props => (isDefined(props.bottom) ? props.bottom + 'px' : 'auto')};
  right: ${props => (isDefined(props.right) ? props.right + 'px' : 'auto')};
  left: ${props => (isDefined(props.left) ? props.left + 'px' : 'auto')};
  position: ${props => props.position ?? 'absolute'};
  justify-content: center;
  align-items: center;
  width: ${props => props.width ?? 45}px;
  height: ${props => props.height ?? 45}px;
  border-radius: ${props => props.borderRadius ?? 15}px;
  elevation: ${props => props.elevation ?? 7};
  background-color: ${props => props.backgroundColor ?? '#fff'};
  flex-direction: row;
  min-width: ${props => props.minWidth ?? 45}px;
`;
