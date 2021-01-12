import {useEffect} from 'react';
import {useDirectionsMode} from '../../stores/directions-mode';

const isExist = value => value !== undefined;

export const useOnIsDirectionsMode = ({mount, unmount}) => {
  const {setIsDirectionsMode} = useDirectionsMode();

  useEffect(() => {
    isExist(mount) && setIsDirectionsMode(mount);
  }, [mount, setIsDirectionsMode]);

  useEffect(() => {
    return () => {
      isExist(unmount) && setIsDirectionsMode(unmount);
    };
  }, [setIsDirectionsMode, unmount]);
  return null;
};
