import {useCallback} from 'react';
import Toast from 'react-native-simple-toast';
import {FetchDirections} from '~/utils/fetch-helpers/fetch-directions';
import {isFilledArr} from '~/utils/validation/helpers';
import {ERROR_OCCURRED, ERROR_NETWORK_FAILED} from '~/constants/constants';
import {getLastItem} from '~/utils/common-helpers/arr-helpers';

export const usePressDrawMode = ({points, pushPoints, dragMode, directionsMode, isDirectionsMode}) => {
  const allowFetchDirections = isDirectionsMode && isFilledArr(points);

  const onFetchSuccess = useCallback(coords => isFilledArr(coords) && pushPoints(coords), [pushPoints]);
  const onFetchError = useCallback(error => {
    Toast.show(error.message === ERROR_NETWORK_FAILED ? ERROR_NETWORK_FAILED : `${ERROR_OCCURRED}. Try later`);
  }, []);

  const fetchDirections = useCallback(
    startend => FetchDirections(startend, directionsMode).then(onFetchSuccess, onFetchError),
    [directionsMode, onFetchError, onFetchSuccess],
  );

  const onPressMap = useCallback(
    info => {
      if (dragMode) return;

      const {coordinates: coords} = info.geometry;
      allowFetchDirections ? fetchDirections([getLastItem(points), coords]) : pushPoints([coords]);
    },
    [allowFetchDirections, dragMode, fetchDirections, points, pushPoints],
  );
  return [onPressMap];
};
