import React from 'react';
import useNavigator from '~/hooks/use-navigator';
import {useModalPicker as usePicker} from '~/stores/modal-picker';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {useModalInputConfirm as useInputConfirm} from '~/stores/modal-input-confirm';
import {useModalTimer as useTimer} from '~/stores/modal-timer';
import {
  useModalPicker,
  useModalFooter as useModalConfirm,
  useModalTimer,
  useModalTextInput,
} from '~/hooks/use-window-modal';
import {observer} from 'mobx-react-lite';

const Main = () => {
  const pickerModal = usePicker();
  const confirmModal = useConfirm();
  const timerModal = useTimer();
  const inputConfirmModal = useInputConfirm();

  const [ModalPicker] = useModalPicker(pickerModal);
  const [ModalConfirm] = useModalConfirm(confirmModal);
  const [ModalTimer] = useModalTimer(timerModal);
  const [ModalInputConfirm] = useModalTextInput(inputConfirmModal);

  const [Navigator] = useNavigator();
  return (
    <>
      {Navigator}
      {ModalPicker}
      {ModalConfirm}
      {ModalTimer}
      {ModalInputConfirm}
    </>
  );
};

export default observer(Main);
