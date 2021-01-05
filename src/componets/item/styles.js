import styled from 'styled-components';
export {Row, Column} from '../../constants/styles';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${props => props.height ?? 60}px;
  border-radius: 15px;
  justify-content: center;
  background-color: ${props => props.backgroundColor ?? '#fff'};
  elevation: 7;
`;

export const TextStyled = styled.Text`
  color: ${props => props.textColor ?? '#8d8d8d'};
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: ${props => props.fontSize ?? 17}px;
  line-height: 23px;
`;
