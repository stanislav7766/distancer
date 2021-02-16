import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import {Container, BtnText, Press, styles, ELEVATION} from './styles';

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

const Btn = ({onPress, onLongPress, containerStyle, textStyle, title}) => {
  const {width, height, elevation} = containerStyle;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scaled = width ? (width < 100 ? 0.8 : 0.9) : 0.95;
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

  const size = {width, height};
  return (
    <Container {...size}>
      <Animated.View
        style={[styles.button, {elevation: elevationAnim.current}, containerStyle, {transform: [{scale}]}]}
      >
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
