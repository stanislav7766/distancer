import {StyleSheet} from 'react-native';
import styled from 'styled-components';

const isDefined = value => value !== undefined;

export const Container = styled.View`
  top: ${props => (isDefined(props.top) ? props.top + 'px' : 'auto')};
  bottom: ${props => (isDefined(props.bottom) ? props.bottom + 'px' : 'auto')};
  right: ${props => (isDefined(props.right) ? props.right + 'px' : 'auto')};
  left: ${props => (isDefined(props.left) ? props.left + 'px' : 'auto')};
  position: ${props => props.position ?? 'absolute'};
`;

export const Press = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex: 1;
`;

export const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    elevation: 7,
    backgroundColor: '#fff',
    width: 45,
    height: 45,
    minWidth: 45,
  },
});
