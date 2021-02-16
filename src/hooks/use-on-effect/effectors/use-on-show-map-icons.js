import {useCallback} from 'react';
import {useMap} from '~/stores/map';
import {isExist} from '~/utils/validation/helpers';
import {useOnEffect} from '../use-on-effect';

export const useOnShowMapIcons = ({mount, unmount}) => {
  const {showMapIcons, setShowMapIcons} = useMap();

  const onMount = useCallback(
    val => {
      setShowMapIcons(val);
    },
    [setShowMapIcons],
  );
  const onUnmount = useCallback(
    val => {
      setShowMapIcons(val);
    },
    [setShowMapIcons],
  );

  useOnEffect({
    needMount: isExist(mount),
    needUnmount: isExist(unmount),
    mount,
    unmount,
    value: showMapIcons,
    onMount,
    onUnmount,
  });
  return null;
};
