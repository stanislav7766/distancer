import {useCallback} from 'react';
import Toast from 'react-native-simple-toast';
import {FetchDirections} from '~/utils/fetch-helpers/fetch-directions';
import {isFilledArr} from '~/utils/validation/helpers';
import {getLastItem} from '~/utils/common-helpers/arr-helpers';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

export const usePressDrawMode = ({points, pushPoints, dragMode, directionsMode, isDirectionsMode}) => {
  const allowFetchDirections = isDirectionsMode && isFilledArr(points);

  const onFetchSuccess = useCallback(coords => isFilledArr(coords) && pushPoints(coords), [pushPoints]);
  const onFetchError = useCallback(error => {
    Toast.show(
      error.message === papyrusify('common.message.errorNetworkFailed')
        ? papyrusify('common.message.errorNetworkFailed')
        : `${papyrusify('common.message.errorOccurred')}. ${papyrusify('common.message.tryLater')}`,
    );
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
