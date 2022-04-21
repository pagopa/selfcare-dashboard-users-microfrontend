import { Route, Switch } from 'react-router';
import * as H from 'history';
import { Store } from 'redux';
import { i18n } from 'i18next';
import { Theme } from '@mui/material';
import { useMemo } from 'react';
import { RouteConfig, RoutesObject } from '../routes';
import { Party } from '../model/Party';
import { Product, ProductsMap } from '../model/Product';

export type DashboardPageProps = {
  party: Party;
  products: Array<Product>;
  activeProducts: Array<Product>;
  productsMap: ProductsMap;
};

export type DashboardMicrofrontendPageProps = DashboardPageProps & {
  decorators: DashboardDecoratorsType;
} & DashboardMicrocomponentsProps;

export type DashboardMicrocomponentsProps = {
  history: H.History;
  theme: Theme;
  store: Store<any, any>;
  i18n: i18n;
};

export type DashboardDecoratorsType = {
  withProductRolesMap: (WrappedComponent: React.ComponentType<any>) => React.ComponentType<any>;
  withSelectedProduct: (WrappedComponent: React.ComponentType<any>) => React.ComponentType<any>;
  withSelectedProductRoles: (
    WrappedComponent: React.ComponentType<any>
  ) => React.ComponentType<any>;
};

const reduceDecorators = (
  decorators: DashboardDecoratorsType,
  route: RouteConfig
): ((WrappedComponent: React.ComponentType<any>) => React.ComponentType<any>) =>
  ['withProductRolesMap', 'withSelectedProductRoles', 'withSelectedProduct'].reduce(
    (out, decorator) =>
      (route as any)[decorator]
        ? (WrappedComponent: React.ComponentType<any>) =>
            (decorators as any)[decorator](out(WrappedComponent))
        : out,
    (WrappedComponent: React.ComponentType<any>) => WrappedComponent
  );

export const buildRoutes = (
  party: Party,
  products: Array<Product>,
  activeProducts: Array<Product>,
  productsMap: ProductsMap,
  decorators: DashboardDecoratorsType,
  rs: RoutesObject
) =>
  Object.values(rs).map((route, i) => {
    const { path, exact, component: Component, subRoutes } = route;
    const decoratorResult = useMemo(
      () => (Component ? reduceDecorators(decorators, route) : undefined),
      []
    );
    const WrappedComponent = useMemo(
      () => (Component && decoratorResult ? decoratorResult(Component) : undefined),
      []
    );
    return (
      <Route path={path} exact={exact} key={i}>
        {WrappedComponent && (
          <WrappedComponent
            party={party}
            products={products}
            activeProducts={activeProducts}
            productsMap={productsMap}
          />
        )}
        {subRoutes && (
          <Switch>
            {buildRoutes(party, products, activeProducts, productsMap, decorators, subRoutes)}
          </Switch>
        )}
      </Route>
    );
  });
