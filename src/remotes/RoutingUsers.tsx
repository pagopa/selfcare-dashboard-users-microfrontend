import { Switch } from 'react-router';
import { DASHBOARD_USERS_ROUTES } from '../routes';
import {
  buildRoutes,
  DashboardMicrofrontendPageProps,
} from '../microcomponents/dashboard-routes-utils';
import RemotePage from './RemotePage';

const RoutingUsers = ({
  history,
  store,
  i18n,
  theme,
  party,
  products,
  activeProducts,
  productsMap,
  decorators,
  CONFIG,
}: DashboardMicrofrontendPageProps) => (
  <RemotePage store={store} history={history} i18n={i18n} theme={theme} CONFIG={CONFIG}>
    <Switch>
      {buildRoutes(
        party,
        products,
        activeProducts,
        productsMap,
        decorators,
        DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes
      )}
    </Switch>
  </RemotePage>
);

export default RoutingUsers;
