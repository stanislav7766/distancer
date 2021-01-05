import styled from 'styled-components';
import {NAVBAR_HEIGHT} from '../../constants/constants';

export {Row, Column} from '../../constants/styles';

export const Container = styled.View`
  width: 100%;
  height: ${NAVBAR_HEIGHT}px;
  min-height: 50px;
  justify-content: center;
  background-color: ${props => props.backgroundColor ?? '#fff'};
  border-radius: 0;
  position: absolute;
  bottom: 0;
  elevation: 16;
`;

export const TextTitle = styled.Text`
  color: ${props => props.color ?? '#fff'};
`;

export const Touchable = styled.TouchableOpacity`
  align-items: center;
`;

export const mx40 = {
  marginRight: 40,
  marginLeft: 40,
};
export const pt5 = {
  paddingTop: 5,
};
