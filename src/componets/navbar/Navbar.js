import React, {useContext} from 'react';
import {appModeContext, liveRouteContext} from '../../contexts/contexts';
import {useTheme} from '../../stores/theme';
import {useAuth} from '../../stores/auth';
import {Touchable, Row, Column, Container, mx40} from './styles';
import {getView} from '../../assets/svg-icons/view';
import {getSaved} from '../../assets/svg-icons/saved';
import {getMenu} from '../../assets/svg-icons/menu';
import {getDraw} from '../../assets/svg-icons/draw';
import {getMarker} from '../../assets/svg-icons/marker';
import {APP_MODE, LIVE_TYPES, PLEASE_FINISH_ACTIVITY} from '../../constants/constants';
import Toast from 'react-native-simple-toast';
import NavbarIcon from './NavbarIcon';
import {observer} from 'mobx-react-lite';
import {randomID} from '../../utils/randomID';

const {STOP} = LIVE_TYPES;
const {VIEW_MODE, DRAW_MODE, SAVED_MODE, MENU_MODE, LIVE_MODE} = APP_MODE;

const Navbar = () => {
  const {themeStyle} = useTheme();
  const {liveRoute} = useContext(liveRouteContext);
  const {appMode, setAppMode} = useContext(appModeContext);
  const {authorized} = useAuth();
  const {status} = liveRoute;
  const toastFinishLive = () => {
    Toast.show(PLEASE_FINISH_ACTIVITY);
  };
  const onPressItem = mode => {
    if (appMode === LIVE_MODE && status !== STOP) {
      toastFinishLive();
      return;
    }
    setAppMode(mode);
  };

  const NavbarItems = Object.keys(navbarItems).map(mode =>
    APP_MODE[mode] === LIVE_MODE && !authorized ? null : (
      <Column key={randomID()}>
        <Touchable onPress={() => onPressItem(APP_MODE[mode])}>
          {navbarItems[mode](appMode === APP_MODE[mode] ? themeStyle.accentColor : themeStyle.textColorSecondary)}
        </Touchable>
      </Column>
    ),
  );
  return (
    <Container backgroundColor={themeStyle.backgroundColor}>
      <Row {...mx40}>{NavbarItems}</Row>
    </Container>
  );
};
export default observer(Navbar);

const navbarItems = {
  LIVE_MODE: fill => <NavbarIcon getXml={getMarker} fillAccent={fill} title={LIVE_MODE} />,
  VIEW_MODE: fill => <NavbarIcon getXml={getView} fillAccent={fill} title={VIEW_MODE} />,
  DRAW_MODE: fill => <NavbarIcon getXml={getDraw} fillAccent={fill} title={DRAW_MODE} />,
  SAVED_MODE: fill => <NavbarIcon getXml={getSaved} fillAccent={fill} title={SAVED_MODE} />,
  MENU_MODE: fill => <NavbarIcon getXml={getMenu} fillAccent={fill} title={MENU_MODE} />,
};
