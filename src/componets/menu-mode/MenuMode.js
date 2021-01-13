import React from 'react';
import {ScrollView, Animated} from 'react-native';
import Shared from './Shared';
import NotAuthorized from './NotAuthorized';
import {useOnIsDirectionsMode} from '../../hooks/use-directions-mode';
import Authorized from './Authorized';
import useEffectOpacity from '../../hooks/use-effect-opacity';
import {styles} from './styles';
import {useAuth} from '../../stores/auth';
import {observer} from 'mobx-react-lite';

const MenuMode = ({themeStyle, navigator}) => {
  const {authorized} = useAuth();
  const [opacityGroup] = useEffectOpacity(400);
  useOnIsDirectionsMode({mount: false});

  const opacityProps = {
    needsOffscreenAlphaCompositing: true,
    style: {opacity: opacityGroup},
  };
  return (
    <Animated.View {...opacityProps}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {authorized ? (
          <Authorized themeStyle={themeStyle} navigator={navigator} />
        ) : (
          <NotAuthorized themeStyle={themeStyle} navigator={navigator} />
        )}
        <Shared themeStyle={themeStyle} navigator={navigator} />
      </ScrollView>
    </Animated.View>
  );
};

export default observer(MenuMode);
