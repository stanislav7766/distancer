import React from 'react';
import {useTheme} from '~/stores/theme';
import {useAuth} from '~/stores/auth';
import {useAppMode} from '~/stores/app-mode';
import {useLiveRoute} from '~/stores/live-route';
import {Row, Column, Container, mx40} from './styles';
import {getView} from '~/assets/svg-icons/view';
import {getSaved} from '~/assets/svg-icons/saved';
import {getMenu} from '~/assets/svg-icons/menu';
import {getDraw} from '~/assets/svg-icons/draw';
import {getMarker} from '~/assets/svg-icons/marker';
import {APP_MODE, LIVE_TYPES, PLEASE_FINISH_ACTIVITY, SHARED_APP_MODES} from '~/constants/constants';
import Toast from 'react-native-simple-toast';
import NavbarIcon from './NavbarIcon';
import {observer} from 'mobx-react-lite';
import {randomID} from '~/utils/random-id';

const {STOP} = LIVE_TYPES;
const {VIEW_MODE, DRAW_MODE, SAVED_MODE, MENU_MODE, LIVE_MODE} = APP_MODE;

const Navbar = () => {
  const {themeStyle} = useTheme();
  const {specs} = useLiveRoute();
  const {appMode, setAppMode} = useAppMode();
  const {authorized} = useAuth();
  const {status} = specs;

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

  const NavbarItems = Object.keys(navbarItems).map(mode => {
    if (!authorized && !SHARED_APP_MODES.includes(APP_MODE[mode])) return null;

    const fill = appMode === APP_MODE[mode] ? themeStyle.accentColor : themeStyle.textColorSecondary;
    const onPress = onPressItem.bind(null, APP_MODE[mode]);
    return <Column key={randomID()}>{navbarItems[mode](fill, onPress)}</Column>;
  });

  return (
    <Container backgroundColor={themeStyle.backgroundColor}>
      <Row {...mx40}>{NavbarItems}</Row>
    </Container>
  );
};
export default observer(Navbar);

const navbarItems = {
  LIVE_MODE: (fill, onPress) => <NavbarIcon getXml={getMarker} fillAccent={fill} onPress={onPress} title={LIVE_MODE} />,
  VIEW_MODE: (fill, onPress) => <NavbarIcon getXml={getView} fillAccent={fill} onPress={onPress} title={VIEW_MODE} />,
  DRAW_MODE: (fill, onPress) => <NavbarIcon getXml={getDraw} fillAccent={fill} onPress={onPress} title={DRAW_MODE} />,
  SAVED_MODE: (fill, onPress) => (
    <NavbarIcon getXml={getSaved} fillAccent={fill} onPress={onPress} title={SAVED_MODE} />
  ),
  MENU_MODE: (fill, onPress) => <NavbarIcon getXml={getMenu} fillAccent={fill} onPress={onPress} title={MENU_MODE} />,
};
