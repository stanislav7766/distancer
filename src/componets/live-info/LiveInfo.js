import React from 'react';
import {Container, LiveInfoText, LiveInfoSubText} from './styles';

const LiveInfo = ({onPress, containerStyle, textStyle, subTextStyle, title, subTitle}) => {
  return (
    <Container {...containerStyle} onStartShouldSetResponder={onPress}>
      <LiveInfoText {...textStyle}>{title}</LiveInfoText>
      <LiveInfoSubText {...subTextStyle}>{subTitle}</LiveInfoSubText>
    </Container>
  );
};
export default LiveInfo;
