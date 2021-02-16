import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import {ACCENT_BLUE} from '~/constants/constants';

export const Container = styled.View`
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  height: ${props => (props.height ? `${props.height}px` : '100%')};
`;
export const Press = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex: 1;
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  height: ${props => (props.height ? `${props.height}px` : '100%')};
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

export const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 22,
    backgroundColor: '#fff',
  },
  container: {
    width: 155,
    height: 96,
    backgroundColor: ACCENT_BLUE,
  },
  text: {
    color: '#fff',
  },
  subText: {
    color: '#fff',
  },
});
export const ELEVATION = 7;
