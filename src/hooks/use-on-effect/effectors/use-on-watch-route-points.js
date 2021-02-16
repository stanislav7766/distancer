import {useCallback} from 'react';
import {useCurrentRoute} from '~/stores/current-route';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnWatchRoutePoints = ({mount, unmount}) => {
  const {watchPoints, setWatchPoints} = useCurrentRoute();

  const onMount = useCallback(
    val => {
      setWatchPoints(val);
    },
    [setWatchPoints],
  );
  const onUnmount = useCallback(
    val => {
      setWatchPoints(val);
    },
    [setWatchPoints],
  );

  useOnEffect({
    needMount: isExist(mount),
    needUnmount: isExist(unmount),
    mount,
    unmount,
    value: watchPoints,
    onMount,
    onUnmount,
  });
  return null;
};
