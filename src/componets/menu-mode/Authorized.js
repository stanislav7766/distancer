import React from 'react';
import useSpinner from '~/componets/spinner/useSpinner';
import {observer} from 'mobx-react-lite';
import {UserGroup, AccountGroup, ActivityGroup} from '~/componets/settings-group';
import {useNavigation} from '~/stores/navigation';

const Authorized = () => {
  const loading = useSpinner({position: 'top'});
  const {pushScreen} = useNavigation();

  const goToEditProfile = () => {
    pushScreen({screenId: 'EditProfile'});
  };

  const UserInfoGroup = <UserGroup goToEditProfile={goToEditProfile} loading={loading} />;
  const AccountSettingsGroup = <AccountGroup loading={loading} />;
  const ActivitySettingsGroup = <ActivityGroup />;

  return (
    <>
      {UserInfoGroup}
      {AccountSettingsGroup}
      {ActivitySettingsGroup}
    </>
  );
};

export default observer(Authorized);
