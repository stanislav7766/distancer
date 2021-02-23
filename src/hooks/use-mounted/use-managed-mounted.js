import {useCallback, useMemo, useRef} from 'react';
import {isEqualJson} from '~/utils/validation/helpers';

export const useManagedMounted = initial => {
  const ref = useRef(initial);

  return [
    useMemo(() => ref, []),
    useCallback(val => {
      !isEqualJson(val, ref.current) && (ref.current = val);
    }, []),
  ];
};
