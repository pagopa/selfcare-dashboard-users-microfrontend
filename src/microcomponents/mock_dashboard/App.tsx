import {
  ErrorBoundary,
  LoadingOverlay,
  UnloadEventHandler,
  UserNotifyHandle,
} from '@pagopa/selfcare-common-frontend';
import { useParams, Route, Switch, useHistory } from 'react-router';
import { isEmpty } from 'lodash';
import withLogin from '@pagopa/selfcare-common-frontend/decorators/withLogin';
import { Box, Grid, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { buildProductsMap, Product } from '../../model/Product';
import { productRoles2ProductRolesList, ProductsRolesMap } from '../../model/ProductRole';
import { createStore } from '../../redux/store';
import {
  DashboardDecoratorsType,
  DashboardMicrofrontendPageProps,
  DashboardPageProps,
} from '../dashboard-routes-utils';
import { mockedParties } from './data/party';
import { mockedPartyProducts } from './data/product';
import { mockedProductRoles } from './data/product';
import Layout from './Layout';

type UrlParams = {
  institutionId: string;
  productId: string;
};

type RoutesObject = { [key: string]: RouteConfig };

type RouteConfig = {
  path: string;
  exact?: boolean;
  subRoutes?: RoutesObject;
  component?: React.ComponentType<any>;
  withProductRolesMap?: boolean;
  withSelectedProduct?: boolean;
  withSelectedProductRoles?: boolean;
};

const reduceRouteConfig = (key: string, routes: RoutesObject): any =>
  Object.entries(routes).map(([innerkey, route]) =>
    innerkey === 'SUBPATH_DEFAULT'
      ? undefined
      : route.subRoutes && !isEmpty(route.subRoutes)
      ? reduceRouteConfig(`${key}${innerkey}.`, route.subRoutes)
      : { [`${key}${innerkey}`]: route.path }
  );

const App = ({
  AppRouting,
  store,
}: {
  AppRouting: (props: DashboardMicrofrontendPageProps) => Array<React.ReactNode>;
  store: ReturnType<typeof createStore>;
}) => {
  const { institutionId } = useParams<UrlParams>();
  const history = useHistory();
  const theme = useTheme();
  const party = mockedParties.find((p) => p.institutionId === institutionId);
  const products = party ? mockedPartyProducts : undefined;
  const activeProducts = products ? products.filter((p) => p.status === 'ACTIVE') : undefined;
  const productsMap = products ? buildProductsMap(products) : undefined;
  const productsRolesMap = party
    ? products?.reduce((acc: ProductsRolesMap, p: Product) => {
        // eslint-disable-next-line functional/immutable-data
        acc[p.id] = productRoles2ProductRolesList(mockedProductRoles);
        return acc;
      }, {} as ProductsRolesMap)
    : undefined;

  const availableParties = mockedParties.map((p) => p.institutionId).join(', ');
  const availableProducts = mockedPartyProducts.map((p) => p.id).join(', ');

  const availableRoutesBody = Object.keys(
    Array.from(
      JSON.stringify((window as any).appRoutes).match(/"path":"[^"]+/g) as Array<string>,
      (m) => m.substring(8)
    )
      .filter((url) => !url.endsWith('/*'))
      .reduce((acc, u) => {
        // eslint-disable-next-line functional/immutable-data
        acc[u] = u;
        return acc;
      }, {} as any)
  ).map((url) => (
    <Fragment key={url}>
      <Link to={url} title={url}>
        {url}
      </Link>
      <br />
    </Fragment>
  ));

  const availableRoutesSideBar = Array.from(
    JSON.stringify(reduceRouteConfig('', (window as any).appRoutes as RoutesObject)).matchAll(
      /"([^"]+)":"([^"]+)"/g
    ) as unknown as Array<any>,
    (match) => (
      <Fragment key={match[1]}>
        <Link key={match[1]} title={match[1]} to={match[2]}>
          {match[1]}
        </Link>
        <br />
      </Fragment>
    )
  );

  const decorators: DashboardDecoratorsType = {
    withProductRolesMap:
      (
        WrappedComponent: React.ComponentType<
          {
            decorators: DashboardDecoratorsType;
          } & DashboardPageProps
        >
      ) =>
      (props: any) =>
        <WrappedComponent productsRolesMap={productsRolesMap} {...props} />,

    withSelectedProductRoles: (WrappedComponent: React.ComponentType<any>) => (props: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { productId } = useParams<UrlParams>();
      const productRolesList = productId ? productsRolesMap?.[productId] : undefined;
      return <WrappedComponent productRolesList={productRolesList} {...props} />;
    },

    withSelectedProduct: (WrappedComponent: React.ComponentType<any>) => (props: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { productId } = useParams<UrlParams>();
      const selectedProduct = productId
        ? mockedPartyProducts.find((p) => p.id === productId)
        : undefined;
      return selectedProduct ? (
        <WrappedComponent selectedProduct={selectedProduct} {...props} />
      ) : (
        <>
          Product not available! Use one of: <br />
          {availableProducts}
        </>
      );
    },
  };

  return party && products && activeProducts && productsMap && productsRolesMap ? (
    <ErrorBoundary>
      <Layout>
        <LoadingOverlay />
        <UserNotifyHandle />
        <UnloadEventHandler />
        <Grid container item pl={{ xs: 4, md: 5, lg: 10 }} xs={12}>
          <Grid item xs={2} sx={{ overflow: 'auto' }}>
            <Box sx={{ backgroundColor: 'background.default' }}>SIDEMENU</Box>
            <br />
            <Box sx={{ backgroundColor: 'background.default' }}>
              <strong>available mocked parties:</strong> <br />
              {availableParties}
            </Box>
            <br />
            <Box sx={{ backgroundColor: 'background.default' }}>
              <strong>available mocked products:</strong> <br /> {availableProducts}
            </Box>
            <br />
            <Box sx={{ backgroundColor: 'background.default' }}>
              <strong>available routes:</strong> <br /> {availableRoutesSideBar}
            </Box>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{ backgroundColor: '#F5F6F7' }}
            display="flex"
            justifyContent="center"
            pb={16}
          >
            <Switch>
              {AppRouting({
                history,
                store,
                theme,
                party,
                products,
                activeProducts,
                productsMap,
                decorators,
              })}
              <Route path="*">
                <Box>
                  DASHBOARD
                  <br />
                  <Box>{availableRoutesBody}</Box>
                </Box>
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Layout>
    </ErrorBoundary>
  ) : (
    <>
      Party not available! Use one of: <br />
      {availableParties}
    </>
  );
};

export default withLogin(App);
