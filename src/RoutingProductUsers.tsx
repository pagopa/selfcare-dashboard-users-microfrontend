import { DASHBOARD_USERS_ROUTES } from './routes';
import { buildRoutes, DashboardMicrofrontendPageProps } from './RoutingUsers';

const RoutingProductUsers = ({
  party,
  products,
  activeProducts,
  productsMap,
  decorators,
}: DashboardMicrofrontendPageProps) => (
  <>
    {buildRoutes(
      party,
      products,
      activeProducts,
      productsMap,
      decorators,
      DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes
    )}
  </>
);

export default RoutingProductUsers;
