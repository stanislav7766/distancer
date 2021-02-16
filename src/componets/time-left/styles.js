import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import {ACCENT_RED} from '~/constants/constants';

export const CenterXY = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TimeLeftText = styled.Text`
  font-size: 100px;
  color: ${ACCENT_RED};
`;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
});
