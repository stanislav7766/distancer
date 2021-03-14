import React from 'react';
import useNavigator from '~/hooks/use-navigator';
import {useModalPicker as usePicker} from '~/stores/modal-picker';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {useModalInputConfirm as useInputConfirm} from '~/stores/modal-input-confirm';
import {useModalTimer as useTimer} from '~/stores/modal-timer';
import {useSpinner} from './stores/spinner';
import {
  useModalPicker,
  useModalFooter as useModalConfirm,
  useModalTimer,
  useModalTextInput,
} from '~/hooks/use-window-modal';
import useHookSpinner from '~/hooks/use-spinner';
import {observer} from 'mobx-react-lite';
import {useAppState} from '~/stores/app-state';
import useHookAppState from '~/hooks/use-app-state';

const Main = () => {
  const pickerModal = usePicker();
  const confirmModal = useConfirm();
  const timerModal = useTimer();
  const inputConfirmModal = useInputConfirm();
  const spinnerStore = useSpinner();
  const appStateStore = useAppState();

  const [ModalPicker] = useModalPicker(pickerModal);
  const [ModalConfirm] = useModalConfirm(confirmModal);
  const [ModalTimer] = useModalTimer(timerModal);
  const [ModalInputConfirm] = useModalTextInput(inputConfirmModal);
  const {LoadingSpinner, MoreLoadingSpinner} = useHookSpinner(spinnerStore);

  const [Navigator] = useNavigator();
  useHookAppState(appStateStore);
  return (
    <>
      {Navigator}
      {ModalPicker}
      {ModalConfirm}
      {ModalTimer}
      {ModalInputConfirm}
      {LoadingSpinner}
      {MoreLoadingSpinner}
    </>
  );
};

export default observer(Main);
