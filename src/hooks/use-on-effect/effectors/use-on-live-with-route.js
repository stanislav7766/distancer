import {useCallback} from 'react';
import {useAppMode} from '~/stores/app-mode';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnLiveWithRoute = ({mount, unmount}) => {
  const {liveWithRoute, setLiveWithRoute} = useAppMode();

  const onMount = useCallback(
    val => {
      setLiveWithRoute(val);
    },
    [setLiveWithRoute],
  );
  const onUnmount = useCallback(
    val => {
      setLiveWithRoute(val);
    },
    [setLiveWithRoute],
  );

  useOnEffect({
    needMount: isExist(mount),
    needUnmount: isExist(unmount),
    mount,
    unmount,
    value: liveWithRoute,
    onMount,
    onUnmount,
  });
  return null;
};
