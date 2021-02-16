import React, {useState, useEffect} from 'react';
import {Route, Activity} from '~/componets/view-route';
import {observer} from 'mobx-react-lite';
import {useTheme} from '~/stores/theme';
import {useNavigation} from '~/stores/navigation';
import {BottomModal} from '~/componets/bottom-modal';
import {useAppMode} from '~/stores/app-mode';
import {MODAL_HEIGHTS} from '~/constants/constants';
import {Styles} from './styles';

const {VIEW_ACTIVITY_HEIGHT, VIEW_ROUTE_HEIGHT} = MODAL_HEIGHTS;

const ViewRouteModal = () => {
  const {themeStyle} = useTheme();
  const [modalHeight, setModalHeight] = useState(VIEW_ROUTE_HEIGHT);
  const {isViewRouteMode} = useAppMode();
  const {popToMainScreen} = useNavigation();

  const {modalStyle} = Styles(themeStyle);

  const goToMain = () => {
    popToMainScreen();
  };

  useEffect(() => {
    const height = isViewRouteMode ? VIEW_ROUTE_HEIGHT : VIEW_ACTIVITY_HEIGHT;
    setModalHeight(height);
  }, [isViewRouteMode]);

  const Body = isViewRouteMode ? (
    <Route goToMain={goToMain} themeStyle={themeStyle} />
  ) : (
    <Activity goToMain={goToMain} themeStyle={themeStyle} />
  );

  const ModalView = (
    <BottomModal modalHeight={modalHeight} modalStyle={modalStyle}>
      {Body}
    </BottomModal>
  );

  return <>{ModalView}</>;
};
export default observer(ViewRouteModal);
