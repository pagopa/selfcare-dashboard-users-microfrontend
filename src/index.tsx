import { Route } from 'react-router-dom';
import registerMicroComponent from './utils/microfrontend/registerMicroComponent';
import { DASHBOARD_USERS_ROUTES } from './routes';
import RoutingProductUsers from './RoutingProductUsers';
import RoutingUsers, { DashboardMicrofrontendPageProps } from './RoutingUsers';
import { ENV } from './utils/env';

/*
import UserDetailPage from './pages/dashboardUserDetail/userDetailPage/UserDetailPage';
import UserProductDetailPage from './pages/dashboardUserDetail/userProductDetailPage/UserProductDetailPage';
import AddProductToUserPage from './pages/dashboardUserEdit/AddProductToUserPage';
import AddUsersPage from './pages/dashboardUserEdit/AddUsersPage';
import AddUsersProductPage from './pages/dashboardUserEdit/AddUsersProductPage';
import EditUserRegistryPage from './pages/dashboardUserEdit/EditUserRegistryPage';
import EditUserRegistryProductPage from './pages/dashboardUserEdit/EditUserRegistryProductPage';
import UsersPage from './pages/dashboardUsers/UsersPage/UsersPage';
import UsersProductPage from './pages/dashboardUsers/UsersProductPage/UsersProductPage';

registerMicroComponent('UsersPage', UsersPage);
registerMicroComponent('UsersProductPage', UsersProductPage);

registerMicroComponent('UserDetailPage', UserDetailPage);
registerMicroComponent('UserProductDetailPage', UserProductDetailPage);

registerMicroComponent('AddUsersPage', AddUsersPage);
registerMicroComponent('AddUsersProductPage', AddUsersProductPage);

registerMicroComponent('AddProductToUserPage', AddProductToUserPage);
registerMicroComponent('EditUserRegistryPage', EditUserRegistryPage);
registerMicroComponent('EditUserRegistryProductPage', EditUserRegistryProductPage);
*/

registerMicroComponent('RoutingUsers', RoutingUsers);
registerMicroComponent('RoutingProductUsers', RoutingProductUsers);

if (document.getElementById('selfcare-users-microfrontend')) {
  // eslint-disable-next-line functional/immutable-data
  (window as any).AppRouting = (props: DashboardMicrofrontendPageProps) => [
    <Route key="RoutingUsers" path={ENV.ROUTES.USERS} exact={false}>
      <RoutingUsers {...props} />
    </Route>,
    <Route key="RoutingProductUsers" path={ENV.ROUTES.PRODUCT_USERS} exact={false}>
      <RoutingProductUsers {...props} />
    </Route>,
  ];
  // eslint-disable-next-line functional/immutable-data
  (window as any).appRoutes = DASHBOARD_USERS_ROUTES;
  require('./utils/microfrontend/indexMicrofrontend');
}
