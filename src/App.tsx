import {
  ErrorBoundary,
  LoadingOverlay,
  UnloadEventHandler,
  UserNotifyHandle,
} from '@pagopa/selfcare-common-frontend';
import { Route, Switch, useParams } from 'react-router';
import withLogin from '@pagopa/selfcare-common-frontend/decorators/withLogin';
import { Box, Grid } from '@mui/material';
import Layout from './components/Layout/Layout';
import { DASHBOARD_USERS_ROUTES, RoutesObject } from './routes';
import { Party } from './model/Party';
import { buildProductsMap, Product, ProductsMap } from './model/Product';
import { mockedParties } from './services/__mocks__/partyService';
import { mockedPartyProducts } from './services/__mocks__/productService';
import { mockedProductRoles } from './services/__mocks__/usersService';
import { productRoles2ProductRolesList, ProductsRolesMap } from './model/ProductRole';

type UrlParams = {
  institutionId: string;
  productId: string;
};

const buildRoutes = (
  party: Party,
  products: Array<Product>,
  activeProducts: Array<Product>,
  productsMap: ProductsMap,
  productsRolesMap: ProductsRolesMap,
  rs: RoutesObject
) =>
  Object.values(rs).map(({ path, exact, component: Component, subRoutes }, i) => {
    const { productId } = useParams<UrlParams>();
    const selectedProduct = productId
      ? mockedPartyProducts.find((p) => p.id === productId)
      : undefined;
    const productRolesList = productId ? productsRolesMap[productId] : undefined;

    return (
      <Route path={path} exact={exact} key={i}>
        {Component && (
          <Component
            party={party}
            selectedProduct={selectedProduct}
            products={products}
            activeProducts={activeProducts}
            productsMap={productsMap}
            productsRolesMap={productsRolesMap}
            productRolesList={productRolesList}
          />
        )}
        {subRoutes && (
          <Switch>
            {buildRoutes(party, products, activeProducts, productsMap, productsRolesMap, subRoutes)}
          </Switch>
        )}
      </Route>
    );
  });

const App = () => {
  const { institutionId } = useParams<UrlParams>();
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
              {buildRoutes(
                party,
                products,
                activeProducts,
                productsMap,
                productsRolesMap,
                DASHBOARD_USERS_ROUTES
              )}
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
