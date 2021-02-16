import {useEffect} from 'react';
import Toast from 'react-native-simple-toast';
import {useAuth} from '~/stores/auth';
import {getCurrentUser} from '~/actions';

export const useCurrentUser = cb => {
  const {setProfile, setAuthorized} = useAuth();

  useEffect(() => {
    getCurrentUser()
      .then(({data, success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        const {user} = data;
        if (user) {
          setProfile(user);
          setAuthorized(true);
        }
      })
      .catch(err => Toast.show(err))
      .finally(() => {
        cb?.();
      });
  }, [cb, setAuthorized, setProfile]);

  return null;
};
