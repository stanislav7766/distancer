import React from 'react';
import useSpinner from '../spinner/useSpinner';
import {observer} from 'mobx-react-lite';
import {UserGroup, AccountGroup, ActivityGroup} from '../settings-group';

const Authorized = ({themeStyle, navigator}) => {
  const loading = useSpinner({position: 'top'});

  const UserInfoGroup = <UserGroup themeStyle={themeStyle} navigator={navigator} loading={loading} />;
  const AccountSettingsGroup = <AccountGroup themeStyle={themeStyle} loading={loading} />;
  const ActivitySettingsGroup = <ActivityGroup themeStyle={themeStyle} />;

  return (
    <>
      {UserInfoGroup}
      {AccountSettingsGroup}
      {ActivitySettingsGroup}
    </>
  );
};

export default observer(Authorized);
