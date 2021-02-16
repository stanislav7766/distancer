import Landing from '~/pages/landing';
import Authorization from '~/pages/authorization';
import EditProfile from '~/pages/edit-profile';
import ViewRoute from '~/pages/view-route';
import Splash from '~/pages/splash';

const pages = {
  Splash,
  Landing,
  Authorization,
  EditProfile,
  ViewRoute,
};

export const getPages = () => ({initial: 'Splash', pages});
