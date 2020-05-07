import React, {useContext, useEffect, Fragment} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {themeContext, modalContext, appModeContext} from '../../contexts/contexts';
import {styleContainer, styleWrap, styleTouchable, styleText, Row, Column} from './styles';
import IconView from '../svg-icons/icon-view/IconView';
import IconSaved from '../svg-icons/icon-saved/IconSaved';
import IconMenu from '../svg-icons/icon-menu/IconMenu';
import IconDraw from '../svg-icons/icon-draw/IconDraw';
import {APP_MODE, NAVBAR_HEIGHT} from '../../constants/constants';

const {VIEW_MODE, DRAW_MODE, SAVED_MODE, MENU_MODE} = APP_MODE;

const Navbar = () => {
  const {theme, getThemeStyle} = useContext(themeContext);
  const {setShownMenu} = useContext(modalContext);
  const {appMode, setAppMode} = useContext(appModeContext);
  const themeStyle = getThemeStyle(theme);
  const onPressItem = mode => setAppMode(mode);
  useEffect(() => {
    appMode === MENU_MODE ? setShownMenu(true) : setShownMenu(false);
  }, [appMode, setShownMenu]);

  const NavbarItems = Object.keys(navbarItems).map(mode => (
    <Column>
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
