import {useCallback, useRef, useEffect} from 'react';

export const useMounted = (onMount, onUnmount) => {
  const mountedRef = useRef(false);

  useEffect(() => {
    onMount?.();
    mountedRef.current = true;

    return () => {
      onUnmount?.();
      mountedRef.current = false;
    };
  }, [onMount, onUnmount]);

  return useCallback(() => mountedRef.current, []);
};
