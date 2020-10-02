import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {appModeContext} from '../../contexts/contexts';
import Shared from './Shared';
import NotAuthorized from './NotAuthorized';
import Authorized from './Authorized';
import {scrollViewStyle} from './styles';

const MenuMode = ({themeStyle, navigator}) => {
  const {auth, setDefaultAuth} = useContext(appModeContext);
  const {authorized} = auth;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={scrollViewStyle}>
      {authorized ? (
        <Authorized setDefaultAuth={setDefaultAuth} themeStyle={themeStyle} navigator={navigator} />
      ) : (
        <NotAuthorized themeStyle={themeStyle} navigator={navigator} />
      )}
      <Shared themeStyle={themeStyle} navigator={navigator} />
    </ScrollView>
  );
};

export default MenuMode;
