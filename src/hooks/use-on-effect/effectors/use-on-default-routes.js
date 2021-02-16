import {useCallback} from 'react';
import {useRoutes} from '~/stores/routes';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnDefaultRoutes = ({mount, unmount}) => {
  const {routes, setDefaultRoutes} = useRoutes();

  const onMount = useCallback(
    val => {
      setDefaultRoutes();
    },
    [setDefaultRoutes],
  );
  const onUnmount = useCallback(
    val => {
      setDefaultRoutes();
    },
    [setDefaultRoutes],
  );

  useOnEffect({
    needMount: isExist(mount),
    needUnmount: isExist(unmount),
    onMount,
    onUnmount,
    value: routes,
    preset: 'filled-arr',
  });
  return null;
};
