import React from 'react';
import {observer} from 'mobx-react-lite';
import {UserGroup, AccountGroup, ActivityGroup, RouteGroup} from '~/componets/settings-group';
import {useNavigation} from '~/stores/navigation';

const Authorized = () => {
  const {pushScreen} = useNavigation();

  const goToEditProfile = () => {
    pushScreen({screenId: 'EditProfile'});
  };

  const UserInfoGroup = <UserGroup goToEditProfile={goToEditProfile} />;
  const AccountSettingsGroup = <AccountGroup />;
  const ActivitySettingsGroup = <ActivityGroup />;
  const RouteSettingsGroup = <RouteGroup />;

  return (
    <>
      {UserInfoGroup}
      {AccountSettingsGroup}
      {ActivitySettingsGroup}
      {RouteSettingsGroup}
    </>
  );
};

export default observer(Authorized);
