import styled from 'styled-components';
export {Row} from '~/constants/styles';
import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '~/constants/constants';

export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  footer: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    bottom: WINDOW_HEIGHT * 0.1,
  },
});

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${props => props.backgroundColor || '#fff'};
`;

export const CenterXY = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const logoSize = WINDOW_WIDTH * 0.4;
