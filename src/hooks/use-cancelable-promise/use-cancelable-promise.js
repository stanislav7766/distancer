import {useCallback} from 'react';
import {useMounted} from '~/hooks/use-mounted';

export const useCancelablePromise = () => {
  const isMounted = useMounted();

  return useCallback(
    (promise, onCancel) =>
      new Promise((resolve, reject) => {
        promise
          .then(result => {
            isMounted() && resolve(result);
          })
          .catch(error => {
            isMounted() && reject(error);
          })
          .finally(() => {
            !isMounted() && onCancel?.();
          });
      }),
    [isMounted],
  );
};
