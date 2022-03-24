import {
  ErrorBoundary,
  LoadingOverlay,
  UnloadEventHandler,
  UserNotifyHandle,
} from '@pagopa/selfcare-common-frontend';
import { useParams, Route, Switch, useHistory } from 'react-router';
import withLogin from '@pagopa/selfcare-common-frontend/decorators/withLogin';
import { Box, Grid, useTheme } from '@mui/material';
import { buildProductsMap, Product } from '../../model/Product';
import { mockedParties } from '../../services/__mocks__/partyService';
import { mockedPartyProducts } from '../../services/__mocks__/productService';
import { mockedProductRoles } from '../../services/__mocks__/usersService';
import { productRoles2ProductRolesList, ProductsRolesMap } from '../../model/ProductRole';
import { createStore } from '../../redux/store';
import Layout from './Layout';
import {
  DashboardDecoratorsType,
  DashboardMicrofrontendPageProps,
  DashboardPageProps,
} from './dashboard-routes-utils';

type UrlParams = {
  institutionId: string;
  productId: string;
};

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
      return <WrappedComponent selectedProduct={selectedProduct} {...props} />;
    },
  };

  return party && products && activeProducts && productsMap && productsRolesMap ? (
    <ErrorBoundary>
      <Layout>
        <LoadingOverlay />
        <UserNotifyHandle />
        <UnloadEventHandler />
        <Grid container item pl={{ xs: 4, md: 5, lg: 10 }} xs={12}>
          <Grid item xs={2}>
            <Box sx={{ backgroundColor: 'background.default' }}>SIDEMENU</Box>
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
                POSSIBLE ROUTES:
                <br />
                {JSON.stringify((window as any).appRoutes)}
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Layout>
    </ErrorBoundary>
  ) : (
    <></>
  );
};

export default withLogin(App);
