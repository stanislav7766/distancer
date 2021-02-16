import React, {useEffect, useCallback} from 'react';
import {Animated} from 'react-native';
import useAnimated from '~/hooks/use-animated';
import {CenterXY, styles, TimeLeftText} from './styles';
import {runParalel} from '~/utils/animations';

const TimeLeft = ({maskColor, opacity, closeWindow, timeLeft, needClose}) => {
  const [animMaskOpacity, compositeAnimationMask] = useAnimated({from: 0, to: opacity});
  const [animWindowOpacity, compositeAnimationWindow] = useAnimated({from: 0, to: 1});

  const close = useCallback(() => {
    runParalel(
      [compositeAnimationWindow({toValue: 0, duration: 100}), compositeAnimationMask({toValue: 0})],
      closeWindow,
    );
  }, [closeWindow, compositeAnimationMask, compositeAnimationWindow]);
  useEffect(() => {
    needClose && close();
  }, [close, needClose]);

  useEffect(() => {
    runParalel([compositeAnimationWindow({toValue: 1, duration: 100}), compositeAnimationMask({toValue: 1})]);
  }, [compositeAnimationMask, compositeAnimationWindow]);

  return (
    <Animated.View needsOffscreenAlphaCompositing style={[styles.container, {opacity: animWindowOpacity}]}>
      <Animated.View style={[styles.mask, {backgroundColor: maskColor, opacity: animMaskOpacity}]} />
      <CenterXY>
        <TimeLeftText>{timeLeft}</TimeLeftText>
      </CenterXY>
    </Animated.View>
  );
};

export default TimeLeft;
