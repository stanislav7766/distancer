import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import {ACCENT_BLUE, ACCENT_RED} from '../../constants/constants';
import {btnContainerStyle, btnTextStyle} from '../../constants/styles';

export {Column} from '../../constants/styles';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: transparent;
`;
export const CenterXY = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.View`
  padding: 10px;
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  border-radius: 15px;
  justify-content: center;
  background-color: ${props => props.backgroundColor || '#fff'};
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
  checkWrap: {position: 'absolute', zIndex: 100, top: 10, right: 10},
  children: {marginRight: 0, marginLeft: 0, justifyContent: 'center', flexDirection: 'row'},
  bottom: {marginRight: 0, marginLeft: 0, justifyContent: 'center', flexDirection: 'row'},
});

export const btnYesStyles = {
  containerStyle: {
    ...btnContainerStyle,
    width: 60,
    height: 30,
    elevation: 1,
    borderRadius: 10,
    backgroundColor: ACCENT_BLUE,
  },
  textStyle: btnTextStyle,
};

export const btnNoStyles = {
  containerStyle: {
    ...btnContainerStyle,
    width: 60,
    height: 30,
    elevation: 1,
    borderRadius: 10,
    backgroundColor: ACCENT_RED,
  },
  textStyle: btnTextStyle,
};
