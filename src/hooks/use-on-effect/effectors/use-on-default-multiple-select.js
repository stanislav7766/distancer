import {useCallback} from 'react';
import {useMultipleSelectBar} from '~/stores/multiple-select-bar';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnDefaultMultipleSelect = ({mount, unmount}) => {
  const {setDefault} = useMultipleSelectBar();
  const onMount = useCallback(
    val => {
      setDefault();
    },
    [setDefault],
  );
  const onUnmount = useCallback(
    val => {
      setDefault();
    },
    [setDefault],
  );

  useOnEffect({
    needMount: isExist(mount),
    needUnmount: isExist(unmount),
    onMount,
    onUnmount,
    preset: 'without-valid',
  });
  return null;
};
