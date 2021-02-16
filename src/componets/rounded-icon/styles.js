import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import {isExist} from '~/utils/validation/helpers';

export const Container = styled.View`
  top: ${props => (isExist(props.top) ? `${props.top}px` : 'auto')};
  bottom: ${props => (isExist(props.bottom) ? `${props.bottom}px` : 'auto')};
  right: ${props => (isExist(props.right) ? `${props.right}px` : 'auto')};
  left: ${props => (isExist(props.left) ? `${props.left}px` : 'auto')};
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
    backgroundColor: '#fff',
    width: 45,
    height: 45,
    minWidth: 45,
  },
});

export const ELEVATION = 7;
