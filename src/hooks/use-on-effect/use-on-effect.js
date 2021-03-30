import {useEffect, useRef} from 'react';
import {isEqualJson, isFilledArr} from '~/utils/validation/helpers';

const validFromPreset = (preset, {r, v}) =>
  ({
    value: r !== v,
    json: !isEqualJson(r, v),
    'filled-arr': isFilledArr(r),
    'without-valid': true,
  }[preset]);

export const useOnEffect = ({needMount, needUnmount, mount, unmount, value, onMount, onUnmount, preset = 'value'}) => {
  const valueRef = useRef(value);

  useEffect(() => {
    needMount && validFromPreset(preset, {r: valueRef.current, v: mount}) && onMount(mount);
  }, [mount, needMount, onMount, preset]);

  useEffect(() => {
    return () => {
      needUnmount && validFromPreset(preset, {r: valueRef.current, v: unmount}) && onUnmount(unmount);
    };
  }, [needUnmount, onUnmount, preset, unmount]);

  useEffect(() => {
    if (!validFromPreset('json', {r: valueRef.current, v: value})) return;

    valueRef.current = value;
  }, [value]);
  return null;
};
