import {useEffect, useMemo, useRef} from 'react';
import {isEqualJson} from '~/utils/validation/helpers';

export const useMakeRef = value => {
  const ref = useRef(value);
  useEffect(() => {
    !isEqualJson(ref.current, value) && (ref.current = value);
  }, [value]);

  return useMemo(() => ref, []);
};
