import React, {useState} from 'react';
import Spinner from './Spinner';

const useSpinner = ({position}) => {
  const [isLoading, setLoading] = useState(false);
  const SpinnerComponent = isLoading ? <Spinner position={position} /> : null;
  return {isLoading, setLoading, SpinnerComponent};
};
export default useSpinner;
