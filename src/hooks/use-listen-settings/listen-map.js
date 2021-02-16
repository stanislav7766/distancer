import {useCallback} from 'react';
import Toast from 'react-native-simple-toast';
import {useMap} from '~/stores/map';
import {readSettings, writeSettings} from '~/utils/fs/storage';
import {ERROR_OCCURRED} from '~/constants/constants';

export const useListenMap = () => {
  const {setMapSettings, mapRef} = useMap();

  const updateStorageMap = useCallback(async () => {
    try {
      if (!mapRef) return;
      const newZoom = await mapRef.getZoom();
      const newCenter = await mapRef.getCenter();
      const settings = await readSettings('map');
      await writeSettings({...settings, zoomLevel: newZoom, centerCoordinate: newCenter}, 'map');
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [mapRef]);

  const updateStoreMap = useCallback(async () => {
    try {
      const settings = await readSettings('map');
      setMapSettings(settings);
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  }, [setMapSettings]);

  return [updateStoreMap, updateStorageMap];
};
