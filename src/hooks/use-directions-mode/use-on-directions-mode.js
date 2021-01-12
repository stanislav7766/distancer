import {useEffect} from 'react';
import {useDirectionsMode} from '../../stores/directions-mode';

const isExist = value => value !== undefined;

export const useOnDirectionsMode = ({mount, unmount}) => {
  const {setDirectionsMode} = useDirectionsMode();

  useEffect(() => {
    isExist(mount) && setDirectionsMode(mount);
  }, [mount, setDirectionsMode]);

  useEffect(() => {
    return () => {
      isExist(unmount) && setDirectionsMode(unmount);
    };
  }, [setDirectionsMode, unmount]);
  return null;
};
