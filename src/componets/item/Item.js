import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import {isExist} from '~/utils/validation/helpers';
import {Column, TextStyled, Row, Container, styles, Press, ELEVATION} from './styles';

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

const Item = ({text, style, onPress, IconComponent, borderStyle, onLongPress}) => {
  const {width, height, fontSize, textColor, backgroundColor, elevation, alignSelf} = style;
  const [flexIcon, flexText] = [style.flexIcon || 0.1, 1 - (style.flexIcon || 0.1)];

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scale = scaleAnim.interpolate({inputRange: [0, 1], outputRange: [1, 0.95]});
  const elevationAnim = useRef(new Animated.Value(1));

  const onPressIn = () => {
    runSpring(scaleAnim, {toValue: 1, useNativeDriver: true});
  };
  const onPressOut = () => {
    runSpring(scaleAnim, {toValue: 0, useNativeDriver: true});
  };
  useEffect(() => {
    const toValue = elevation ?? ELEVATION;
    const timer = setTimeout(
      () => runAnimation(elevationAnim.current, {toValue, useNativeDriver: true, duration: 1500}),
      500,
    );
    return () => {
      clearTimeout(timer);
    };
  }, [elevation]);

  return (
    <Container width={width} height={height}>
      <Animated.View
        style={[
          styles.button,
          {elevation: elevationAnim.current},
          {backgroundColor, height},
          {transform: [{scale}]},
          borderStyle,
        ]}
      >
        <Press
          activeOpacity={1}
          onPress={onPress}
          onLongPress={onLongPress}
          {...(isExist(onPress) ? {onPressIn, onPressOut} : {})}
        >
          <Row>
            {IconComponent && (
              <Column alignItems="flex-start" flex={flexIcon}>
                {IconComponent}
              </Column>
            )}
            <Column alignItems="flex-start" flex={flexText}>
              <TextStyled fontSize={fontSize} textColor={textColor} alignSelf={alignSelf}>
                {text}
              </TextStyled>
            </Column>
          </Row>
        </Press>
      </Animated.View>
    </Container>
  );
};

export default Item;
