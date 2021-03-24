import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import {isExist} from '~/utils/validation/helpers';
import {Container, styles, Press, ELEVATION} from './styles';

const runSpring = (anim, params, cb) => {
  Animated.spring(anim, params).start(() => {
    cb?.();
  });
};

const runAnimation = (anim, params, cb) => {
  Animated.timing(anim, params).start(() => {
    cb?.();
  });
};

const RoundedIcon = ({IconComponent, style, onPress, onLongPress}) => {
  const {top, bottom, right, left, position, elevation, ...restStyle} = style;
  const {width} = style;
  const dimensions = {top, bottom, right, left, position};

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scaled = width ? (width < 100 ? 0.8 : 0.9) : 0.8;
  const scale = scaleAnim.interpolate({inputRange: [0, 1], outputRange: [1, scaled]});
  const elevationAnim = useRef(new Animated.Value(0));

  const onPressIn = () => {
    runSpring(scaleAnim, {toValue: 1, useNativeDriver: true});
  };
  const onPressOut = () => {
    runSpring(scaleAnim, {toValue: 0, useNativeDriver: true});
  };
  useEffect(() => {
    const toValue = elevation ?? ELEVATION;
    const timer = setTimeout(
      () => runAnimation(elevationAnim.current, {toValue, useNativeDriver: true, duration: 3500}),
      500,
    );
    return () => {
      clearTimeout(timer);
    };
  }, [elevation]);
  return (
    <Container {...dimensions}>
      <Animated.View style={[styles.button, restStyle, {elevation: elevationAnim.current}, {transform: [{scale}]}]}>
        <Press
          activeOpacity={1}
          onPress={onPress}
          onLongPress={onLongPress}
          {...(isExist(onPress) ? {onPressIn, onPressOut} : {})}
        >
          {IconComponent}
        </Press>
      </Animated.View>
    </Container>
  );
};

export default RoundedIcon;
