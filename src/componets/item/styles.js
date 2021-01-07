import {StyleSheet} from 'react-native';
import styled from 'styled-components';
export {Row, Column} from '../../constants/styles';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${props => props.height ?? 60}px;
`;

export const TextStyled = styled.Text`
  color: ${props => props.textColor ?? '#8d8d8d'};
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: ${props => props.fontSize ?? 17}px;
  line-height: 23px;
`;

export const Press = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: '#fff',
    elevation: 7,
  },
});
