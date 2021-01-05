import styled from 'styled-components';
export {Row, Column, mx0} from '../../constants/styles';

export const Container = styled.TouchableOpacity`
  justify-content: ${props => props.justifyContent ?? 'center'};
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  height: ${props => (props.height ? props.height + 'px' : '100%')};
  border-radius: ${props => props.borderRadius ?? 15}px;
  elevation: ${props => props.elevation ?? 7};
  background-color: ${props => props.backgroundColor ?? '#4285F4'};
`;

export const BtnText = styled.Text`
  font-size: ${props => props.fontSize ?? 15}px;
  color: ${props => props.color ?? '#fff'};
`;
