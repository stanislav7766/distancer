import Landing from '~/pages/landing';
import Authorization from '~/pages/authorization';
import EditProfile from '~/pages/edit-profile';
import ViewRoute from '~/pages/view-route';

const pages = {
  Landing,
  Authorization,
  EditProfile,
  ViewRoute,
};

export const getPages = () => ({initial: 'Landing', pages});
