import React, {useEffect} from 'react';
import {TouchableOpacity, View, Animated} from 'react-native';
import useSvgFactory from '../../hooks/use-svg-factory';
import Btn from '../btn/Btn';
import useAnimated from '../../hooks/use-animated';
import {ACCENT_GREEN, ACCENT_RED} from '../../constants/constants';
import {CenterXY, Form, styles, Column, btnYesStyles, btnNoStyles} from './styles';
import {runParalel} from '../../utils/animations';
import {getCheck} from '../../assets/svg-icons/check';
import {getClose} from '../../assets/svg-icons/close';

const checkSvgParams = {
  width: 33,
  height: 33,
  fillAccent: ACCENT_GREEN,
  fillSecondary: '#fff',
};
const closeSvgParams = {
  width: 20,
  height: 20,
  fillAccent: ACCENT_RED,
};

const Window = ({
  children,
  backgroundColor,
  maskColor,
  opacity,
  width,
  preset,
  closeWindow,
  onBottomYes,
  onBottomNo,
}) => {
  const [animMaskOpacity, compositeAnimationMask] = useAnimated({from: 0, to: opacity});
  const [animWindowOpacity, compositeAnimationWindow] = useAnimated({from: 0, to: 1});
  const isBottomPreset = preset === 'footer';

  const close = () => {
    runParalel(
      [compositeAnimationWindow({toValue: 0, duration: 100}), compositeAnimationMask({toValue: 0})],
      closeWindow,
    );
  };

  const onBottomYesHandler = () => {
    close();
    onBottomYes?.();
  };
  const onBottomNoHandler = () => {
    close();
    onBottomNo?.();
  };

  const RenderBottom = type =>
    ({
      footer: (
        <>
          <Column alignItems="flex-start">
            <Btn {...btnYesStyles} onPress={onBottomYesHandler} title="Yes" />
          </Column>
          <Column alignItems="flex-end">
            <Btn {...btnNoStyles} onPress={onBottomNoHandler} title="No" />
          </Column>
        </>
      ),
    }[type]);

  const RenderHeader = type =>
    ({
      check: useSvgFactory(getCheck, checkSvgParams),
      close: useSvgFactory(getClose, closeSvgParams),
    }[type]);

  useEffect(() => {
    runParalel([compositeAnimationWindow({toValue: 1, duration: 100}), compositeAnimationMask({toValue: 1})]);
  }, [compositeAnimationMask, compositeAnimationWindow]);
  return (
    <Animated.View style={[styles.container, {opacity: animWindowOpacity}]}>
      <Animated.View style={[styles.mask, {backgroundColor: maskColor, opacity: animMaskOpacity}]} />
      <CenterXY>
        <Form backgroundColor={backgroundColor} width={width}>
          {!isBottomPreset && (
            <TouchableOpacity onPress={close} style={styles.checkWrap}>
              {RenderHeader(preset)}
            </TouchableOpacity>
          )}
          <Animated.View style={[styles.children]}>{children}</Animated.View>
          {isBottomPreset && <View style={[styles.bottom]}>{RenderBottom(preset)}</View>}
        </Form>
      </CenterXY>
    </Animated.View>
  );
};

export default Window;
