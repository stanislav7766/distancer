import styled from 'styled-components';

export const Container = styled.View`
  justify-content: ${props => props.justifyContent ?? 'center'};
  align-items: ${props => props.alignItems ?? 'center'};
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  height: ${props => (props.height ? props.height + 'px' : '100%')};
  border-radius: ${props => props.borderRadius ?? 22}px;
  elevation: ${props => props.elevation ?? 7};
  background-color: ${props => props.backgroundColor ?? '#fff'};
`;
export const LiveInfoText = styled.Text`
  font-size: ${props => props.fontSize ?? 30}px;
  color: ${props => props.color ?? '#fff'};
  text-align: ${props => props.textAlign ?? 'center'};
`;
export const LiveInfoSubText = styled.Text`
  font-size: ${props => props.fontSize ?? 20}px;
  color: ${props => props.color ?? '#fff'};
  text-align: ${props => props.textAlign ?? 'center'};
`;
