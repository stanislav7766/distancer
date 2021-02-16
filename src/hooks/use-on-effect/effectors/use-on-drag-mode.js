import {useCallback} from 'react';
import {useAppMode} from '~/stores/app-mode';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnDragMode = ({mount, unmount}) => {
  const {dragMode, setDragMode} = useAppMode();

  const onMount = useCallback(
    val => {
      setDragMode(val);
    },
    [setDragMode],
  );
  const onUnmount = useCallback(
    val => {
      setDragMode(val);
    },
    [setDragMode],
  );

  useOnEffect({
    needMount: isExist(mount),
    needUnmount: isExist(unmount),
    mount,
    unmount,
    value: dragMode,
    onMount,
    onUnmount,
  });

  return null;
};
