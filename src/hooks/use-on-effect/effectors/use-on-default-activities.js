import {useCallback} from 'react';
import {useActivities} from '~/stores/activities';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnDefaultActivities = ({mount, unmount}) => {
  const {activities, setDefaultActivities} = useActivities();
  const onMount = useCallback(
    val => {
      setDefaultActivities();
    },
    [setDefaultActivities],
  );
  const onUnmount = useCallback(
    val => {
      setDefaultActivities();
    },
    [setDefaultActivities],
  );

  useOnEffect({
    needMount: isExist(mount),
    needUnmount: isExist(unmount),
    onMount,
    onUnmount,
    value: activities,
    preset: 'filled-arr',
  });

  return null;
};
