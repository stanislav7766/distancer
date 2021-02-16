import React from 'react';
import useNavigator from '~/hooks/use-navigator';
import {useModalPicker as usePicker} from '~/stores/modal-picker';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {useModalTimer as useTimer} from '~/stores/modal-timer';
import {useModalPicker, useModalFooter as useModalConfirm, useModalTimer} from '~/hooks/use-window-modal';
import {observer} from 'mobx-react-lite';

const Main = () => {
  const pickerModal = usePicker();
  const confirmModal = useConfirm();
  const timerModal = useTimer();
  const [ModalPicker] = useModalPicker(pickerModal);
  const [ModalConfirm] = useModalConfirm(confirmModal);
  const [ModalTimer] = useModalTimer(timerModal);

  const [Navigator] = useNavigator();
  return (
    <>
      {Navigator}
      {ModalPicker}
      {ModalConfirm}
      {ModalTimer}
    </>
  );
};

export default observer(Main);
