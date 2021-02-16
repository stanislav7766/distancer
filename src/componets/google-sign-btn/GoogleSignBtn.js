import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import {Container, BtnText, Row, Column, mx0, styles, Press, ELEVATION} from './styles';
import useSvgFactory from '~/hooks/use-svg-factory';
import {getGoogle} from '~/assets/svg-icons/google';

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

const GoogleSignBtn = ({title, onPress, containerStyle, textStyle}) => {
  const {width, height, elevation} = containerStyle;
  const IconGoogle = useSvgFactory(getGoogle, {width: 25, height: 25});

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
  const size = {width, height};
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
    <Container {...size}>
      <Animated.View
        style={[styles.button, containerStyle, {elevation: elevationAnim.current}, {transform: [{scale}]}]}
      >
        <Press {...size} activeOpacity={1} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
          <Row {...mx0}>
            <Column {...styles.google} height={height}>
              {IconGoogle}
            </Column>
            <Column alignItems="center">
              <BtnText {...textStyle}>{title}</BtnText>
            </Column>
          </Row>
        </Press>
      </Animated.View>
    </Container>
  );
};
export default GoogleSignBtn;
