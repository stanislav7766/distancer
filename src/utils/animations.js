import {Animated} from 'react-native';

export const runParalel = (animations, cb) => {
  Animated.parallel(animations).start(() => {
    cb && cb();
  });
};

export const runSequence = (animations, cb) => {
  Animated.sequence(animations).start(() => {
    cb && cb();
  });
};

export const getParalel = animations => Animated.parallel(animations);

export const getSequance = animations => Animated.sequence(animations);

export const getAnimation = (animValue, params) =>
  Animated.timing(animValue, {
    toValue: params.toValue,
    duration: params.duration || 250,
    useNativeDriver: params.useNativeDriver || false,
  });

export const runAnimation = (animation, cb) =>
  animation.start(() => {
    cb && cb();
  });
