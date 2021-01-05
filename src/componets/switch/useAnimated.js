import {useRef} from 'react';
import {Animated} from 'react-native';
import {getAnimation} from './animations';

export const useAnimated = ({from, to, defaultValue}) => {
  const anim = useRef(new Animated.Value(defaultValue ?? from));

  const compositeAnimation = params =>
    getAnimation(anim.current, {...params, toValue: params.toValue === 0 ? from : to});

  return [anim.current, compositeAnimation];
};
