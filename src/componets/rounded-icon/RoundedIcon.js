import React, {useRef} from 'react';
import {Animated} from 'react-native';
import {Container, styles, Press} from './styles';

const runSpring = (anim, params, cb) => {
  Animated.spring(anim, params).start(() => {
    cb?.();
  });
};

const RoundedIcon = ({IconComponent, style, onPress, onLongPress}) => {
  const {top, bottom, right, left, position, ...restStyle} = style;
  const {width} = style;
  const dimensions = {top, bottom, right, left, position};

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scaled = width ? (width < 100 ? 0.8 : 0.9) : 0.8;
  const scale = scaleAnim.interpolate({inputRange: [0, 1], outputRange: [1, scaled]});

  const onPressIn = () => {
    runSpring(scaleAnim, {toValue: 1, useNativeDriver: true});
  };
  const onPressOut = () => {
    runSpring(scaleAnim, {toValue: 0, useNativeDriver: true});
  };
  return (
    <Container {...dimensions}>
      <Animated.View style={[styles.button, restStyle, {transform: [{scale}]}]}>
        <Press
          activeOpacity={1}
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          {IconComponent}
        </Press>
      </Animated.View>
    </Container>
  );
};

export default RoundedIcon;
