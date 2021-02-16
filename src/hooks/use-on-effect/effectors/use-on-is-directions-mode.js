import {useCallback} from 'react';
import {useDirectionsMode} from '~/stores/directions-mode';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnIsDirectionsMode = ({mount, unmount}) => {
  const {setIsDirectionsMode, isDirectionsMode} = useDirectionsMode();

  const onMount = useCallback(
    val => {
      setIsDirectionsMode(val);
    },
    [setIsDirectionsMode],
  );
  const onUnmount = useCallback(
    val => {
      setIsDirectionsMode(val);
    },
    [setIsDirectionsMode],
  );

  useOnEffect({
    needMount: isExist(mount),
    needUnmount: isExist(unmount),
    mount,
    unmount,
    value: isDirectionsMode,
    onMount,
    onUnmount,
  });
  return null;
};
