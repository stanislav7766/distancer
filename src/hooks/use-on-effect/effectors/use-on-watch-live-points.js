import {useCallback} from 'react';
import {useLiveRoute} from '~/stores/live-route';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnWatchLivePoints = ({mount, unmount}) => {
  const {watchPoints, setWatchPoints} = useLiveRoute();

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
