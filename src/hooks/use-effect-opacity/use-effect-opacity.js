import {useEffect} from 'react';
import useAnimated from '../use-animated';

const useEffectOpacity = (time, cb) => {
  const [anim, compositeOpacity] = useAnimated({from: 0, to: 1});

  useEffect(() => {
    const timer = setTimeout(() => {
      compositeOpacity({toValue: 1, useNativeDriver: true}).start();
    }, time ?? 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cb, compositeOpacity, time]);

  return [anim];
};

export default useEffectOpacity;
