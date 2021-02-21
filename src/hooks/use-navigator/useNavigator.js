import React from 'react';
import Navigator from 'react-native-easy-router';
import {useNavigation} from '~/stores/navigation';
import {getPages} from '~/config/pages';

const useNavigator = () => {
  const {setNavigation, onStackUpdate} = useNavigation();

  const {initial, pages} = getPages();

  const RoleNavigator = (
    <Navigator navigatorRef={setNavigation} onStackUpdate={onStackUpdate} screens={pages} initialStack={initial} />
  );

  return [RoleNavigator];
};

export default useNavigator;
