import React, {Fragment, useContext} from 'react';
import {appModeContext} from '../../contexts/contexts';
import Shared from './Shared';
import NotAuthorized from './NotAuthorized';
import Authorized from './Authorized';

const MenuMode = ({themeStyle, navigator}) => {
  const {auth, setDefaultAuth} = useContext(appModeContext);
  const {authorized} = auth;

  return (
    <Fragment>
      {authorized ? (
        <Authorized setDefaultAuth={setDefaultAuth} themeStyle={themeStyle} navigator={navigator} />
      ) : (
        <NotAuthorized themeStyle={themeStyle} navigator={navigator} />
      )}
      <Shared themeStyle={themeStyle} navigator={navigator} />
    </Fragment>
  );
};

export default MenuMode;
