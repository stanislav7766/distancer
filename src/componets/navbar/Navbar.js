import React, {useContext, useEffect, Fragment} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {themeContext, modalContext, appModeContext, liveRouteContext} from '../../contexts/contexts';
import {styleContainer, styleWrap, styleTouchable, styleText, Row, Column} from './styles';
import IconView from '../svg-icons/icon-view/IconView';
import IconSaved from '../svg-icons/icon-saved/IconSaved';
import IconMenu from '../svg-icons/icon-menu/IconMenu';
import IconDraw from '../svg-icons/icon-draw/IconDraw';
import IconMarker from '../svg-icons/icon-marker/IconMarker';
import {APP_MODE, NAVBAR_HEIGHT, LIVE_TYPES, PLEASE_FINISH_ACTIVITY} from '../../constants/constants';
import Toast from 'react-native-simple-toast';
const {STOP} = LIVE_TYPES;
const {VIEW_MODE, DRAW_MODE, SAVED_MODE, MENU_MODE, LIVE_MODE} = APP_MODE;

const Navbar = () => {
  const {theme, getThemeStyle} = useContext(themeContext);
  const {setShownMenu} = useContext(modalContext);
  const {liveRoute} = useContext(liveRouteContext);
  const {appMode, setAppMode} = useContext(appModeContext);
  const themeStyle = getThemeStyle(theme);
  const {status} = liveRoute;
  const toastFinishLive = () => {
    Toast.show(PLEASE_FINISH_ACTIVITY);
  };
  const onPressItem = mode => {
    if (!!(appMode === LIVE_MODE && status !== STOP)) {
      toastFinishLive();
      return;
    }
    setAppMode(mode);
  };
  useEffect(() => {
    appMode === MENU_MODE ? setShownMenu(true) : setShownMenu(false);
  }, [appMode, setShownMenu]);

  const NavbarItems = Object.keys(navbarItems).map((mode, i) => (
    <Column key={i}>
      <TouchableOpacity style={styleTouchable} onPress={() => onPressItem(APP_MODE[mode])}>
        {navbarItems[mode](appMode === APP_MODE[mode] ? themeStyle.accentColor : themeStyle.textColorSecondary)}
      </TouchableOpacity>
    </Column>
  ));
  return (
    <View style={[styleContainer, {backgroundColor: themeStyle.backgroundColor, height: NAVBAR_HEIGHT}]}>
      <View style={styleWrap}>
        <Row paddingTop={5}>{NavbarItems}</Row>
      </View>
    </View>
  );
};
export default Navbar;

const navbarItems = {
  LIVE_MODE: fill => (
    <Fragment>
      <IconMarker width={22} height={20} fill={fill} />
      <Text style={[styleText, {color: fill}]}>{LIVE_MODE}</Text>
    </Fragment>
  ),
  VIEW_MODE: fill => (
    <Fragment>
      <IconView width={22} height={20} fill={fill} />
      <Text style={[styleText, {color: fill}]}>{VIEW_MODE}</Text>
    </Fragment>
  ),
  DRAW_MODE: fill => (
    <Fragment>
      <IconDraw width={22} height={20} fill={fill} />
      <Text style={[styleText, {color: fill}]}>{DRAW_MODE}</Text>
    </Fragment>
  ),
  SAVED_MODE: fill => (
    <Fragment>
      <IconSaved width={22} height={20} fill={fill} />
      <Text style={[styleText, {color: fill}]}>{SAVED_MODE}</Text>
    </Fragment>
  ),
  MENU_MODE: fill => (
    <Fragment>
      <IconMenu width={22} height={20} fill={fill} />
      <Text style={[styleText, {color: fill}]}>{MENU_MODE}</Text>
    </Fragment>
  ),
};
