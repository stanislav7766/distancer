import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {appModeContext} from '../../contexts/contexts';
import Shared from './Shared';
import NotAuthorized from './NotAuthorized';
import {useOnIsDirectionsMode} from '../../hooks/use-directions-mode';
import Authorized from './Authorized';
import {styles} from './styles';

const MenuMode = ({themeStyle, navigator}) => {
  const {
    auth: {authorized},
  } = useContext(appModeContext);
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

export default MenuMode;
