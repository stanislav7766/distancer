import React from 'react';
import {useTheme} from '~/stores/theme';
import Spinner from '~/componets/spinner';

const useSpinner = spinnerStore => {
  const {themeStyle} = useTheme();
  const {showLoading, showMoreLoading, isLoading, isMoreLoading, loadingPosition, moreLoadingPosition} = spinnerStore;

  const LoadingSpinner =
    isLoading && showLoading ? <Spinner themeStyle={themeStyle} position={loadingPosition} /> : null;
  const MoreLoadingSpinner =
    isMoreLoading && showMoreLoading ? <Spinner themeStyle={themeStyle} position={moreLoadingPosition} /> : null;

  return {LoadingSpinner, MoreLoadingSpinner};
};
export default useSpinner;
