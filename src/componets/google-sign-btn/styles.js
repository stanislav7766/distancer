import {StyleSheet} from 'react-native';
import styled from 'styled-components';
export {Row, Column, mx0} from '../../constants/styles';

export const Container = styled.View`
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  height: ${props => (props.height ? props.height + 'px' : '100%')};
`;

export const Press = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex: 1;
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  height: ${props => (props.height ? props.height + 'px' : '100%')};
`;

export const BtnText = styled.Text`
  font-size: ${props => props.fontSize ?? 15}px;
  color: ${props => props.color ?? '#fff'};
`;

export const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 15,
    elevation: 7,
    backgroundColor: '#fff',
  },
  google: {
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    paddingRight: 10,
    paddingLeft: 10,
  },
});
