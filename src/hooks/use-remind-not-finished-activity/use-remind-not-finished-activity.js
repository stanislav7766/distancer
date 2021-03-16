import {useCallback} from 'react';
import {useMounted} from '../use-mounted';
import {useModalNotFinishedActivity as useNotFinishedActivity} from '~/stores/modal-not-finished-activity';
import {useAuth} from '~/stores/auth';
import Toast from 'react-native-simple-toast';
import {getLocaleStore} from '~/stores/locale';
import {checkNotFinishedActivity, saveActivity} from '~/actions';

const store = getLocaleStore();

export const useRemindNotFinishedActivity = () => {
  const {authorized, profile} = useAuth();
  const {userId} = profile;
  const {setInit, onShowWindow} = useNotFinishedActivity();

  const onRequestWindow = useCallback(
    init => {
      setInit(init);
      setTimeout(onShowWindow, 1000);
    },
    [onShowWindow, setInit],
  );

  const onCheckNotFinishedActivity = useCallback(() => {
    if (!authorized) return;
    checkNotFinishedActivity({payload: {userId}})
      .then(({data, success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        if (!data.exists) return;
        onRequestWindow({
          headerText: store.papyrusify('liveMode.message.notFinishedActivity'),
          activity: data.activity,
          userId,
          saveActivity,
        });
      })
      .catch(err => Toast.show(err));
  }, [authorized, onRequestWindow, userId]);

  useMounted(onCheckNotFinishedActivity);

  return null;
};
