import {useRef} from 'react';
import {useModalInputConfirm as useInputConfirm} from '~/stores/modal-input-confirm';
import {verifyPassword} from '~/actions';
import Toast from 'react-native-simple-toast';
import {useCancelablePromise} from '~/hooks/use-cancelable-promise';
import {useSpinner} from '~/stores/spinner';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

export const useVerifyPassword = () => {
  const manageRef = useRef({
    onSuccess: () => {},
    onFailure: () => {},
  });
  const makeCancelable = useCancelablePromise();

  const {startLoading, stopLoading, isLoading} = useSpinner();

  const {setInit: setInitInputConfirm, onShowInputConfirm, onHideInputConfirm} = useInputConfirm();

  const onVerifyPassword = ({payload}) => {
    if (isLoading) return;
    startLoading({show: true});
    makeCancelable(verifyPassword({payload}), () => {
      stopLoading();
    })
      .then(({success, reason}) => {
        if (!success) {
          manageRef.current?.onFailure?.();
          Toast.show(reason);
          return;
        }
        manageRef.current?.onSuccess?.();
      })
      .catch(err => {
        manageRef.current?.onFailure?.();
        Toast.show(err);
      })
      .finally(_ => {
        stopLoading();
      });
  };

  const requestVerify = password => {
    onVerifyPassword({payload: {password}});
    onHideInputConfirm();
  };

  const showVerifyPassword = (onSuccess, onFailure) => {
    manageRef.current = {...manageRef.current, onSuccess, onFailure};

    setInitInputConfirm({
      headerText: papyrusify('menuMode.message.verifyPassword'),
      btnText: papyrusify('menuMode.button.verify'),
      onYes: requestVerify,
      input: {
        placeholder: papyrusify('menuMode.input.currentPassword'),
      },
      preset: 'close',
    });
    onShowInputConfirm();
  };

  return [showVerifyPassword, onHideInputConfirm];
};
