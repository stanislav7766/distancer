import {useEffect, useCallback} from 'react';
import {IsFirstLaunch} from '~/utils/is-first-launch';
import {initialLoad} from '~/utils/fs/storage';
import useAppState from '../use-app-state';
import {useListenApp} from './listen-app';
import {useListenMap} from './listen-map';
import {useListenActivity} from './listen-activity';
import {useListenRoute} from './listen-route';

const useListenSettings = () => {
  const [, isGoOutState] = useAppState();

  const [updateStoreApp, updateStorageApp] = useListenApp();
  const [updateStoreMap, updateStorageMap] = useListenMap();
  const [updateStoreActivity, updateStorageActivity] = useListenActivity();
  const [updateStoreRoute, updateStorageRoute] = useListenRoute();

  const updateStorageSettings = useCallback(async () => {
    if (!isGoOutState) return;
    await Promise.all([updateStorageActivity(), updateStorageApp(), updateStorageMap(), updateStorageRoute()]);
  }, [isGoOutState, updateStorageActivity, updateStorageApp, updateStorageMap, updateStorageRoute]);

  const updateStoreSettings = useCallback(async () => {
    const isFirstLaunch = await IsFirstLaunch();
    if (isFirstLaunch) {
      await initialLoad();
      return;
    }
    await Promise.all([updateStoreActivity(), updateStoreApp(), updateStoreMap(), updateStoreRoute()]);
  }, [updateStoreActivity, updateStoreApp, updateStoreMap, updateStoreRoute]);

  useEffect(() => {
    updateStorageSettings();
  }, [updateStorageSettings]);

  useEffect(() => {
    updateStoreSettings();
  }, [updateStoreSettings]);
};

export default useListenSettings;
