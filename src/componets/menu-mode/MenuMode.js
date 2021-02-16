import React from 'react';
import {ScrollView} from 'react-native';
import Shared from './Shared';
import NotAuthorized from './NotAuthorized';
import {useOnIsDirectionsMode, useOnShowMapIcons} from '~/hooks/use-on-effect';
import Authorized from './Authorized';
import {styles} from './styles';
import {useAuth} from '~/stores/auth';
import {observer} from 'mobx-react-lite';

const MenuMode = () => {
  const {authorized} = useAuth();
  useOnIsDirectionsMode({mount: false});
  useOnShowMapIcons({mount: false});
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      {authorized ? <Authorized /> : <NotAuthorized />}
      <Shared />
    </ScrollView>
  );
};

export default observer(MenuMode);
