import React from 'react';
import {FormGroup} from '~/componets/form-group';
import {observer} from 'mobx-react-lite';
import {useTheme} from '~/stores/theme';
import {getLocaleStore} from '~/stores/locale';
import {useChangeEmail} from '~/hooks/use-preferences/change-email';
import {useChangePassword} from '~/hooks/use-preferences/change-password';
import {useDeleteAccount} from '~/hooks/use-preferences/delete-account';

const {papyrusify} = getLocaleStore();

const GroupAccount = () => {
  const {themeStyle} = useTheme();

  const [changeEmailItem] = useChangeEmail();
  const [changePasswordItem] = useChangePassword();
  const [deleteAccountItem] = useDeleteAccount();

  const accountSettingsItems = [changeEmailItem, changePasswordItem, deleteAccountItem];

  const AccountSettingsGroup = (
    <FormGroup
      items={accountSettingsItems}
      themeStyle={themeStyle}
      title={papyrusify('menuMode.title.accountSettings')}
    />
  );

  return <>{AccountSettingsGroup}</>;
};

export const AccountGroup = observer(GroupAccount);
