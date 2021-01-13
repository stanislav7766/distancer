import React, {useState, useEffect, useRef} from 'react';
import {View, Animated, TouchableWithoutFeedback} from 'react-native';
import {useAnimated} from './useAnimated';
import {runSequence, runAnimation} from './animations';
import {getConfig} from './config';
import {styles, getCircleStyle, getContainerStyle, getPadding, getCircleSize} from './styles';

const Switch = ({initialPosition, withIcons, sizes, onTrue, onFalse, trueStyle, falseStyle, FalseIcon, TrueIcon}) => {
  const [active, setActive] = useState(initialPosition);

  const onPress = () => {
    setActive(old => !old);
  };
  const onCb = () => {
    active ? onTrue?.() : onFalse?.();
  };

  const {width, height} = sizes;
  const circleSize = getCircleSize(height);
  const padding = getPadding(height);

  const [IconRef, setIcon] = useState(initialPosition ? TrueIcon : FalseIcon);

  const configParams = useRef(
    getConfig({
      width,
      circleSize,
      padding,
      initialPosition,
    }),
  ).current;

  const [iconFade, compositeIconFade] = useAnimated(configParams.iconFadeParams);
  const [iconOffset, compositeIconOffset] = useAnimated(configParams.iconOffsetParams);
  const [circleOffset, compositeCircleOffset] = useAnimated(configParams.circleOffsetParams);

  const circleStyle = getCircleStyle({
    size: circleSize,
    backgroundColor: active ? trueStyle.accentColor : falseStyle.accentColor,
  });
  const containerStyle = getContainerStyle({
    height,
    width,
    backgroundColor: active ? trueStyle.backgroundColor : falseStyle.backgroundColor,
  });

  const Position = (
    <View style={[styles.circle]}>
      <Animated.View style={[circleStyle, {transform: [{translateX: circleOffset}]}]} />
    </View>
  );
  const Icon = (
    <View style={[styles.icon, {width: width / 2}]}>
      <Animated.View style={[{opacity: iconFade}, {transform: [{translateX: iconOffset}]}]}>{IconRef}</Animated.View>
    </View>
  );

  const animateWithoutIcons = position => {
    const animCircleOffset = compositeCircleOffset({toValue: position ? 1 : 0});
    const animations = [animCircleOffset];
    runSequence(animations, onCb);
  };
  const animateWithIcons = position => {
    const animCircleOffset = compositeCircleOffset({toValue: position ? 1 : 0, duration: 100});
    const animIconOffset = compositeIconOffset({toValue: position ? 0 : 1, duration: 1});
    const animHideIcon = compositeIconFade({toValue: 0});
    const animShowIcon = compositeIconFade({toValue: 1});
    const animations = [animIconOffset, animCircleOffset, animShowIcon];
    runAnimation(animHideIcon, () => {
      onCb();
      setIcon(position ? TrueIcon : FalseIcon);
      runSequence(animations);
    });
  };

  useEffect(() => {
    withIcons ? animateWithIcons(active) : animateWithoutIcons(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={containerStyle}>
        {Position}
        {Icon}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Switch;
