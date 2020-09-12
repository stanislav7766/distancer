import React, {useEffect, useRef, useContext} from 'react';
import {Keyboard, Animated, View} from 'react-native';
import {
  modalContext,
  routeContext,
  themeContext,
  placesContext,
  appModeContext,
  liveRouteContext,
} from '../../contexts/contexts';
import DrawMode from '../draw-mode/DrawMode';
import ViewRoute from '../view-route/ViewRoute';
import ViewMode from '../view-mode/ViewMode';
import LiveMode from '../live-mode/LiveMode';
import MenuMode from '../menu-mode/MenuMode';
import SavedMode from '../saved-mode/SavedMode';
import {styleContainer, styleModal} from './styles';
import {APP_MODE, WINDOW_HEIGHT} from '../../constants/constants';
const {VIEW_ROUTE, VIEW_MODE, DRAW_MODE, MENU_MODE, SAVED_MODE, LIVE_MODE} = APP_MODE;

const Modal = ({navigator}) => {
  const modalY = useRef(new Animated.Value(WINDOW_HEIGHT - 150)).current;
  const {setDefaultPlaces} = useContext(placesContext);
  const {theme, getThemeStyle} = useContext(themeContext);
  const {appMode} = useContext(appModeContext);
  const {setExpanded, setDragMode} = useContext(modalContext);
  const {setDefaultActivities, setDefaultLiveRoute} = useContext(liveRouteContext);
  const {setDefaultRoutes, setDefaultRoute} = useContext(routeContext);
  const themeStyle = getThemeStyle(theme);

  const modeHelpers = mode =>
    ({
      [DRAW_MODE]: () => {
        doubleModal();
        setDefaultRoute();
        setDragMode(false);
      },
      [VIEW_ROUTE]: () => {},
      [LIVE_MODE]: () => {
        closeModal();

        setDefaultRoutes();
        setDefaultRoute();
        setDefaultActivities();
        setDefaultLiveRoute();
        setDragMode(false);
      },
      [VIEW_MODE]: () => {
        closeModal();
        setDefaultRoutes();
        setDefaultRoute();
        setDragMode(false);
      },
      [MENU_MODE]: () => {
        doubleModal();
      },
      [SAVED_MODE]: () => {
        openModal();
      },
    }[mode]());

  useEffect(() => {
    modeHelpers(appMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appMode]);

  const doubleModal = () => {
    setExpanded(true);

    Animated.timing(modalY, {
      duration: 300,
      toValue: appMode === DRAW_MODE ? drawHeight : appMode === MENU_MODE ? menuHeight : 0,
      useNativeDriver: true,
    }).start();
  };

  const double2Modal = () => {
    Animated.timing(modalY, {
      duration: 300,
      toValue: liveHeight,
      useNativeDriver: true,
    }).start();
  };

  const viewActivityModal = () => {
    Animated.timing(modalY, {
      duration: 300,
      toValue: viewActivityHeight,
      useNativeDriver: true,
    }).start();
  };

  const openModal = () => {
    setExpanded(true);
    Animated.timing(modalY, {
      duration: 300,
      toValue: WINDOW_HEIGHT * 0.15,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setDefaultPlaces();
    setExpanded(false);
    Keyboard.dismiss();
    Animated.timing(modalY, {
      duration: 300,
      toValue: appMode === DRAW_MODE ? drawHeight : viewHeight,
      useNativeDriver: true,
    }).start();
  };
  const DrawModeComponent = <DrawMode themeStyle={themeStyle} />;
  const ViewRouteComponent = (
    <ViewRoute expandActivity={viewActivityModal} expandRoute={closeModal} themeStyle={themeStyle} />
  );
  const ViewModeComponent = <ViewMode themeStyle={themeStyle} closeModal={closeModal} openModal={openModal} />;
  const MenuModeComponent = <MenuMode navigator={navigator} themeStyle={themeStyle} />;
  const SavedModeComponent = <SavedMode closeModal={closeModal} themeStyle={themeStyle} />;

  const LiveModeComponent = <LiveMode closeModal={closeModal} openModal={double2Modal} themeStyle={themeStyle} />;

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
      <Animated.View style={{transform: [{translateY: modalY}]}}>
        <View style={[styleModal, {backgroundColor: themeStyle.backgroundColor}]}>
          <View style={{height: viewHeight}}>{Body}</View>
        </View>
      </Animated.View>
    </View>
  );
};
export default Modal;

const viewHeight = WINDOW_HEIGHT - 150;
const drawHeight = WINDOW_HEIGHT - 200;
const menuHeight = WINDOW_HEIGHT - 400;
const viewActivityHeight = WINDOW_HEIGHT - 300;
const liveHeight = WINDOW_HEIGHT - 250;
