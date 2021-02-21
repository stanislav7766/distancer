import {useCallback, useEffect} from 'react';
import {InteractionManager} from 'react-native';

export const useRunAfterInteractions = cb => {
  const ran = useCallback(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(cb);
    return () => interactionPromise.cancel();
  }, [cb]);

  useEffect(() => {
    ran();
  }, [ran]);

  return ran;
};
