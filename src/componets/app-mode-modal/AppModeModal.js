import React, {useEffect, useState, useCallback} from 'react';
import {BottomModal} from '~/componets/bottom-modal';
import {DrawMode} from '~/componets/draw-mode';
import {ViewMode} from '~/componets/view-mode';
import {LiveMode} from '~/componets/live-mode';
import {MenuMode} from '~/componets/menu-mode';
import {SavedMode} from '~/componets/saved-mode';
import {useTheme} from '~/stores/theme';
import {useAppMode} from '~/stores/app-mode';
import {Styles} from './styles';
import {APP_MODE, MODAL_HEIGHTS} from '~/constants/constants';
import {observer} from 'mobx-react-lite';

const {VIEW_MODE, DRAW_MODE, MENU_MODE, SAVED_MODE, LIVE_MODE} = APP_MODE;

const AppModeModal = () => {
  const [modalHeight, setModalHeight] = useState(MODAL_HEIGHTS.VIEW_HEIGHT);
  const {themeStyle} = useTheme();
  const {appMode} = useAppMode();

  const {modalStyle} = Styles(themeStyle);

  const modeHelpers = useCallback(
    mode =>
      ({
        [DRAW_MODE]: drawModal,
        [LIVE_MODE]: liveModal,
        [VIEW_MODE]: viewModal,
        [MENU_MODE]: menuModal,
        [SAVED_MODE]: savedModal,
      }[mode]()),
    [drawModal, liveModal, menuModal, savedModal, viewModal],
  );

  useEffect(() => {
    modeHelpers(appMode);
  }, [appMode, modeHelpers]);

  const drawModal = useCallback(() => {
    setModalHeight(MODAL_HEIGHTS.DRAW_HEIGHT);
  }, []);

  const liveModal = useCallback(() => {
    setModalHeight(MODAL_HEIGHTS.LIVE_HEIGHT);
  }, []);

  const liveExpandedModal = useCallback(() => {
    setModalHeight(MODAL_HEIGHTS.LIVE_EXP_HEIGHT);
  }, []);

  const savedModal = useCallback(() => {
    setModalHeight(MODAL_HEIGHTS.SAVED_HEIGHT);
  }, []);
  const menuModal = useCallback(() => {
    setModalHeight(MODAL_HEIGHTS.MENU_HEIGHT);
  }, []);

  const viewExpandedModal = useCallback(() => {
    setModalHeight(MODAL_HEIGHTS.VIEW_EXP_HEIGHT);
  }, []);

  const viewModal = useCallback(() => {
    setModalHeight(MODAL_HEIGHTS.VIEW_HEIGHT);
  }, []);

  const appModeCall = useCallback(
    mode =>
      ({
        [DRAW_MODE]: <DrawMode themeStyle={themeStyle} />,
        [VIEW_MODE]: <ViewMode themeStyle={themeStyle} closeModal={viewModal} openModal={viewExpandedModal} />,
        [MENU_MODE]: <MenuMode themeStyle={themeStyle} />,
        [SAVED_MODE]: <SavedMode themeStyle={themeStyle} />,
        [LIVE_MODE]: <LiveMode closeModal={liveModal} openModal={liveExpandedModal} themeStyle={themeStyle} />,
      }[mode]),
    [liveExpandedModal, liveModal, themeStyle, viewExpandedModal, viewModal],
  );
  const [bodyRef, setBody] = useState(appModeCall(appMode));

  useEffect(() => {
    const updateBody = () => {
      setBody(appModeCall(appMode));
    };
    const timer = setTimeout(updateBody, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [appMode, appModeCall]);

  return (
    <BottomModal modalHeight={modalHeight} modalStyle={modalStyle}>
      {bodyRef}
    </BottomModal>
  );
};
export default observer(AppModeModal);
