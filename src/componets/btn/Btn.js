import React, {useRef} from 'react';
import {Animated} from 'react-native';
import {Container, BtnText, Press, styles} from './styles';

const runSpring = (anim, params, cb) => {
  Animated.spring(anim, params).start(() => {
    cb?.();
  });
};

const Btn = ({onPress, onLongPress, containerStyle, textStyle, title}) => {
  const {width, height} = containerStyle;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scaled = width ? (width < 100 ? 0.8 : 0.9) : 0.95;
  const scale = scaleAnim.interpolate({inputRange: [0, 1], outputRange: [1, scaled]});

  const onPressIn = () => {
    runSpring(scaleAnim, {toValue: 1, useNativeDriver: true});
  };
  const onPressOut = () => {
    runSpring(scaleAnim, {toValue: 0, useNativeDriver: true});
  };
  const size = {width, height};
  return (
    <Container {...size}>
      <Animated.View style={[styles.button, containerStyle, {transform: [{scale}]}]}>
        <Press
          {...size}
          activeOpacity={1}
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <BtnText {...textStyle}>{title}</BtnText>
        </Press>
      </Animated.View>
    </Container>
  );
};

export default Btn;
