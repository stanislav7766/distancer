import {useState, useRef, useCallback, useEffect} from 'react';
import {isEqualJson} from '~/utils/validation/helpers';

const useLoopIterator = array => {
  const [index, setIndex] = useState(0);
  const arrRef = useRef(array);

  const next = useCallback(() => {
    const nextInd = index < arrRef.current.length - 1 ? index + 1 : 0;
    setIndex(nextInd);
    return arrRef.current[nextInd];
  }, [index]);

  useEffect(() => {
    if (isEqualJson(array, arrRef.current)) return;
    arrRef.current = array;
  }, [array]);

  return [arrRef.current[index], next];
};

export default useLoopIterator;
