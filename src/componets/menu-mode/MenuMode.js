import React from 'react';
import {ScrollView} from 'react-native';
import Shared from './Shared';
import NotAuthorized from './NotAuthorized';
import {useOnIsDirectionsMode} from '../../hooks/use-directions-mode';
import Authorized from './Authorized';
import {styles} from './styles';
import {useAuth} from '../../stores/auth';
import {observer} from 'mobx-react-lite';

const MenuMode = ({themeStyle, navigator}) => {
  const {authorized} = useAuth();
  useOnIsDirectionsMode({mount: false});
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {authorized ? (
          <Authorized themeStyle={themeStyle} navigator={navigator} />
        ) : (
          <NotAuthorized themeStyle={themeStyle} navigator={navigator} />
        )}
        <Shared themeStyle={themeStyle} navigator={navigator} />
      </ScrollView>
    </>
  );
};

export default observer(MenuMode);
