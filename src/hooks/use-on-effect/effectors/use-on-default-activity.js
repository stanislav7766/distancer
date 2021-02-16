import {useCallback} from 'react';
import {DEFAULT_LIVE_ROUTE} from '~/constants/constants';
import {useLiveRoute} from '~/stores/live-route';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnDefaultActivity = ({mount, unmount}) => {
  const {liveRoute, setDefaultLiveRoute} = useLiveRoute();
  const onMount = useCallback(
    val => {
      setDefaultLiveRoute();
    },
    [setDefaultLiveRoute],
  );
  const onUnmount = useCallback(
    val => {
      setDefaultLiveRoute();
    },
    [setDefaultLiveRoute],
  );

  useOnEffect({
    needMount: isExist(mount),
    needUnmount: isExist(unmount),
    mount: DEFAULT_LIVE_ROUTE,
    unmount: DEFAULT_LIVE_ROUTE,
    value: liveRoute,
    onMount,
    onUnmount,
    preset: 'json',
  });
  return null;
};
