import {useCallback} from 'react';
import {useMounted} from '../use-mounted';
import {useModalNotFinishedRoute as useNotFinishedRoute} from '~/stores/modal-not-finished-route';
import {useAuth} from '~/stores/auth';
import Toast from 'react-native-simple-toast';
import {getLocaleStore} from '~/stores/locale';
import {checkNotFinishedRoute, saveRoute} from '~/actions';

const store = getLocaleStore();

export const useRemindNotFinishedRoute = () => {
  const {authorized, profile} = useAuth();
  const {userId} = profile;
  const {setInit, onShowWindow} = useNotFinishedRoute();

  const onRequestWindow = useCallback(
    init => {
      setInit(init);
      setTimeout(onShowWindow, 1000);
    },
    [onShowWindow, setInit],
  );

  const onCheckNotFinishedRoute = useCallback(() => {
    if (!authorized) return;
    checkNotFinishedRoute({payload: {userId}})
      .then(({data, success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        if (!data.exists) return;
        onRequestWindow({
          headerText: store.papyrusify('drawMode.message.notFinishedRoute'),
          route: data.route,
          userId,
          saveRoute,
        });
      })
      .catch(err => Toast.show(err));
  }, [authorized, onRequestWindow, userId]);

  useMounted(onCheckNotFinishedRoute);

  return null;
};
