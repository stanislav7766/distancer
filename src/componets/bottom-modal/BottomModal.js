import React, {useRef, useEffect, useMemo} from 'react';
import {Animated, View, InteractionManager} from 'react-native';
import {getAnimation, runSequence} from '~/utils/animations';
import {styleContainer, styleModal} from './styles';

const BottomModal = ({children, modalStyle, modalHeight}) => {
  const modalY = useRef(new Animated.Value(0));
  const bodyOpacity = useRef(new Animated.Value(0));

  const opacityHide = useMemo(
    () => getAnimation(bodyOpacity.current, {duration: 1, toValue: 0, useNativeDriver: true}),
    [],
  );
  const opacityShow = useMemo(
    () => getAnimation(bodyOpacity.current, {duration: 300, toValue: 1, useNativeDriver: true}),
    [],
  );
  useEffect(() => {
    const handle = InteractionManager.createInteractionHandle();

    setTimeout(() => InteractionManager.clearInteractionHandle(handle), 700);

    return () => InteractionManager.clearInteractionHandle(handle);
  });

  useEffect(() => {
    const heightComposition = getAnimation(modalY.current, {duration: 300, toValue: modalHeight});
    runSequence([opacityHide, heightComposition, opacityShow]);
  }, [modalHeight, opacityHide, opacityShow]);

  return (
    <View style={styleContainer}>
      <Animated.View style={[styleModal, modalStyle, {height: modalY.current}]}>
        <Animated.View needsOffscreenAlphaCompositing style={{opacity: bodyOpacity.current}}>
          {children}
        </Animated.View>
      </Animated.View>
    </View>
  );
};
export default BottomModal;
