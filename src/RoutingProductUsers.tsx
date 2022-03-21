import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { DASHBOARD_USERS_ROUTES } from './routes';
import { buildRoutes, DashboardMicrofrontendPageProps } from './RoutingUsers';

const RoutingProductUsers = ({
  history,
  store,
  theme,
  party,
  products,
  activeProducts,
  productsMap,
  decorators,
}: DashboardMicrofrontendPageProps) => (
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Switch>
          {buildRoutes(
            party,
            products,
            activeProducts,
            productsMap,
            decorators,
            DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes
          )}
        </Switch>
      </ThemeProvider>
    </Router>
  </Provider>
);

export default RoutingProductUsers;
