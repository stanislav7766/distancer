import {useCallback} from 'react';
import {useDirectionsMode} from '~/stores/directions-mode';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnDirectionsMode = ({mount, unmount}) => {
  const {setDirectionsMode, directionsMode} = useDirectionsMode();

  const onMount = useCallback(
    val => {
      setDirectionsMode(val);
    },
    [setDirectionsMode],
  );
  const onUnmount = useCallback(
    val => {
      setDirectionsMode(val);
    },
    [setDirectionsMode],
  );

  useOnEffect({
    needMount: isExist(mount),
    needUnmount: isExist(unmount),
    mount,
    unmount,
    value: directionsMode,
    onMount,
    onUnmount,
  });
  return null;
};
