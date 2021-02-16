import {useRef, useCallback} from 'react';
import {Animated} from 'react-native';

const useAnimated = ({from, to}) => {
  const anim = useRef(new Animated.Value(from));

  const compositeAnimation = useCallback(
    params =>
      Animated.timing(anim.current, {
        toValue: params.toValue === 0 ? from : to,
        duration: params.duration || 250,
        useNativeDriver: params.useNativeDriver || false,
      }),
    [from, to],
  );

  return [anim.current, compositeAnimation];
};

export default useAnimated;
