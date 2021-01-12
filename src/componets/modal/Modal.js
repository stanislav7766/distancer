import React, {useEffect, useRef, useContext} from 'react';
import {Keyboard, Animated, View} from 'react-native';
import {modalContext, routeContext, appModeContext, liveRouteContext} from '../../contexts/contexts';
import DrawMode from '../draw-mode/DrawMode';
import ViewRoute from '../view-route/ViewRoute';
import ViewMode from '../view-mode/ViewMode';
import LiveMode from '../live-mode/LiveMode';
import MenuMode from '../menu-mode/MenuMode';
import SavedMode from '../saved-mode/SavedMode';
import {useTheme} from '../../stores/theme';
import {styleContainer, styleModal, noModalRadius} from './styles';
import {APP_MODE, ROUTE_TYPES, WINDOW_HEIGHT} from '../../constants/constants';
import {observer} from 'mobx-react-lite';
const {VIEW_ROUTE, VIEW_MODE, DRAW_MODE, MENU_MODE, SAVED_MODE, LIVE_MODE} = APP_MODE;

const Modal = ({navigator}) => {
  const modalY = useRef(new Animated.Value(viewHeight)).current;
  const {themeStyle} = useTheme();
  const {appMode, viewMode} = useContext(appModeContext);
  const {setExpanded, setDragMode} = useContext(modalContext);
  const {setDefaultActivities, setDefaultLiveRoute} = useContext(liveRouteContext);
  const {setDefaultRoutes, setDefaultRoute, currentRoute} = useContext(routeContext);
  const {inLive} = currentRoute;

  const modeHelpers = mode =>
    ({
      [DRAW_MODE]: () => {
        drawModal();
        setDefaultRoute();
        setDragMode(false);
      },
      [VIEW_ROUTE]: () => {
        viewMode === ROUTE_TYPES.ROUTE ? viewRouteModal() : viewActivityModal();
      },
      [LIVE_MODE]: () => {
        liveModal();
        setDefaultRoutes();
        !inLive && setDefaultRoute();
        setDefaultActivities();
        setDefaultLiveRoute();
        setDragMode(false);
      },
      [VIEW_MODE]: () => {
        viewModal();
        setDefaultRoutes();
        setDefaultRoute();
        setDragMode(false);
      },
      [MENU_MODE]: () => {
        menuModal();
      },
      [SAVED_MODE]: () => {
        savedModal();
      },
    }[mode]());

  useEffect(() => {
    modeHelpers(appMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appMode]);

  const animateModal = toValue => {
    Animated.timing(modalY, {
      duration: 300,
      toValue,
      useNativeDriver: false,
    }).start();
  };

  const drawModal = () => {
    setExpanded(false);
    animateModal(drawHeight);
  };

  const liveModal = () => {
    setExpanded(false);
    animateModal(liveHeight);
  };

  const liveExpandedModal = () => {
    setExpanded(false);
    animateModal(liveExpandedHeight);
  };

  const viewActivityModal = () => {
    setExpanded(true);
    animateModal(viewActivityHeight);
  };
  const viewRouteModal = () => {
    setExpanded(false);
    animateModal(viewRouteHeight);
  };
  const savedModal = () => {
    setExpanded(true);
    animateModal(savedHeight);
  };
  const menuModal = () => {
    setExpanded(true);
    animateModal(menuHeight);
  };

  const viewExpandedModal = () => {
    setExpanded(true);
    animateModal(viewExpandedHeight);
  };

  const viewModal = () => {
    setExpanded(false);
    Keyboard.dismiss();
    animateModal(viewHeight);
  };
  const DrawModeComponent = <DrawMode themeStyle={themeStyle} />;
  const ViewRouteComponent = <ViewRoute themeStyle={themeStyle} />;
  const ViewModeComponent = <ViewMode themeStyle={themeStyle} closeModal={viewModal} openModal={viewExpandedModal} />;
  const MenuModeComponent = <MenuMode navigator={navigator} themeStyle={themeStyle} />;
  const SavedModeComponent = <SavedMode themeStyle={themeStyle} />;

  const LiveModeComponent = <LiveMode closeModal={liveModal} openModal={liveExpandedModal} themeStyle={themeStyle} />;

  const appModeCall = mode =>
    ({
      [DRAW_MODE]: DrawModeComponent,
      [VIEW_ROUTE]: ViewRouteComponent,
      [VIEW_MODE]: ViewModeComponent,
      [MENU_MODE]: MenuModeComponent,
      [SAVED_MODE]: SavedModeComponent,
      [LIVE_MODE]: LiveModeComponent,
    }[mode]);

  const Body = appModeCall(appMode);

  return (
    <View style={styleContainer}>
      <Animated.View
        style={[
          styleModal,
          {minHeight: modalY, backgroundColor: themeStyle.backgroundColor},
          appMode === MENU_MODE && noModalRadius,
        ]}
      >
        {Body}
      </Animated.View>
    </View>
  );
};
export default observer(Modal);

const liveHeight = 70;
const liveExpandedHeight = 180;
const viewHeight = 70;
const viewExpandedHeight = WINDOW_HEIGHT * 0.75;
const drawHeight = 120;
const savedHeight = WINDOW_HEIGHT * 0.8;
const viewActivityHeight = 210;
const viewRouteHeight = 70;
const menuHeight = WINDOW_HEIGHT;
