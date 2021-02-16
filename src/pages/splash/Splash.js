import React, {useCallback} from 'react';
import {View} from 'react-native';
import useSvgFactory from '~/hooks/use-svg-factory';
import {getSplashFooter} from '~/assets/svg-icons/splash-footer';
import {getLogo} from '~/assets/svg-icons/logo';
import {styles, CenterXY, logoSize} from './styles';
import {ACCENT_BLUE} from '~/constants/constants';
import {useCurrentUser} from '~/hooks/use-current-user';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '~/stores/navigation';

const footerParams = {
  width: logoSize * 2,
  height: (logoSize * 2) / 6,
  fillAccent: ACCENT_BLUE,
};

const logoParams = {
  width: logoSize,
  height: logoSize,
};

const Splash = () => {
  const {pushScreen} = useNavigation();

  const toLanding = useCallback(() => {
    pushScreen({screenId: 'Landing'});
  }, [pushScreen]);

  useCurrentUser(toLanding);

  const Footer = useSvgFactory(getSplashFooter, footerParams);
  const Logo = useSvgFactory(getLogo, logoParams);

  return (
    <View style={styles.wrap}>
      <CenterXY>{Logo}</CenterXY>
      <View style={styles.footer}>{Footer}</View>
    </View>
  );
};

export default observer(Splash);
