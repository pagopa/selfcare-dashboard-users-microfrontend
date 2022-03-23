import { Route } from 'react-router-dom';
import { DASHBOARD_USERS_ROUTES } from './routes';
import RoutingProductUsers from './RoutingProductUsers';
import RoutingUsers from './RoutingUsers';
import { ENV } from './utils/env';
import { DashboardMicrofrontendPageProps } from './utils/microfrontend/dashboard-routes-utils';

if (process.env.NODE_ENV === 'development') {
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
