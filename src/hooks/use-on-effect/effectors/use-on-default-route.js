import {useCallback} from 'react';
import {DEFAULT_ROUTE} from '~/constants/constants';
import {useCurrentRoute} from '~/stores/current-route';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnDefaultRoute = ({mount, unmount}) => {
  const {currentRoute, setDefaultRoute} = useCurrentRoute();
  const onMount = useCallback(
    val => {
      setDefaultRoute();
    },
    [setDefaultRoute],
  );
  const onUnmount = useCallback(
    val => {
      setDefaultRoute();
    },
    [setDefaultRoute],
  );

  useOnEffect({
    needMount: isExist(mount),
    needUnmount: isExist(unmount),
    mount: DEFAULT_ROUTE,
    unmount: DEFAULT_ROUTE,
    value: currentRoute,
    onMount,
    onUnmount,
    preset: 'json',
  });
  return null;
};
