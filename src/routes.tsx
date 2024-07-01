import { Redirect, useParams } from 'react-router';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { ENV } from './utils/env';
import AddUsersProductPage from './pages/dashboardUserEdit/AddUsersProductPage';
import AddUsersPage from './pages/dashboardUserEdit/AddUsersPage';
import EditUserRegistryPage from './pages/dashboardUserEdit/EditUserRegistryPage';
import UserDetailPage from './pages/dashboardUserDetail/userDetailPage/UserDetailPage';
import UserProductDetailPage from './pages/dashboardUserDetail/userProductDetailPage/UserProductDetailPage';
import UsersPage from './pages/dashboardUsers/UsersPage/UsersPage';
import UsersProductPage from './pages/dashboardUsers/UsersProductPage/UsersProductPage';
import AddProductToUserPage from './pages/dashboardUserEdit/AddProductToUserPage';
import EditUserRegistryProductPage from './pages/dashboardUserEdit/EditUserRegistryProductPage';

export type RoutesObject = { [key: string]: RouteConfig };

export type RouteConfig = {
  path: string;
  exact?: boolean;
  subRoutes?: RoutesObject;
  component?: React.ComponentType<any>;
  withProductRolesMap?: boolean;
  withSelectedProduct?: boolean;
  withSelectedProductRoles?: boolean;
};

const buildRedirectToBasePath = (basePath: string): RoutesObject => ({
  SUBPATH_DEFAULT: {
    path: `${basePath}/*`,
    component: (): React.FunctionComponentElement<any> => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const pathVariables: { [key: string]: string } = useParams();
      const effectiveBasePath = resolvePathVariables(basePath, pathVariables);
      return <Redirect to={`${effectiveBasePath || basePath}`} />;
    },
  },
});

export const DASHBOARD_USERS_ROUTES = {
  PARTY_USERS: {
    path: ENV.ROUTES.USERS,
    exact: false,
    subRoutes: {
      MAIN: {
        path: ENV.ROUTES.USERS,
        exact: true,
        withProductRolesMap: true,
        component: UsersPage,
      },
      EDIT_USER: {
        path: `${ENV.ROUTES.USERS}/:userId/edit`,
        exact: true,
        component: EditUserRegistryPage,
      },
      ADD_PARTY_USER: {
        path: `${ENV.ROUTES.USERS}/add`,
        exact: true,
        withProductRolesMap: true,
        component: AddUsersPage,
      },
      ADD_PRODUCT: {
        path: `${ENV.ROUTES.USERS}/:userId/add-product`,
        exact: true,
        withProductRolesMap: true,
        component: AddProductToUserPage,
      },
      PARTY_USER_DETAIL: {
        path: ENV.ROUTES.USERS_DETAIL,
        exact: true,
        withProductRolesMap: true,
        component: UserDetailPage,
      },
      ...buildRedirectToBasePath(ENV.ROUTES.USERS),
    },
  },
  PARTY_PRODUCT_USERS: {
    path: ENV.ROUTES.PRODUCT_USERS,
    exact: false,
    subRoutes: {
      MAIN: {
        path: ENV.ROUTES.PRODUCT_USERS,
        exact: true,
        withSelectedProduct: true,
        withSelectedProductRoles: true,
        component: UsersProductPage,
      },
      EDIT_PARTY_PRODUCT_USER: {
        path: `${ENV.ROUTES.PRODUCT_USERS}/:userId/edit`,
        exact: true,
        withSelectedProduct: true,
        component: EditUserRegistryProductPage,
      },
      ADD_PARTY_PRODUCT_USER: {
        path: `${ENV.ROUTES.PRODUCT_USERS}/add`,
        exact: true,
        withSelectedProduct: true,
        withSelectedProductRoles: true,
        component: AddUsersProductPage,
      },
      PARTY_PRODUCT_USER_DETAIL: {
        path: `${ENV.ROUTES.PRODUCT_USERS}/:userId`,
        exact: true,
        withSelectedProduct: true,
        withSelectedProductRoles: true,
        component: UserProductDetailPage,
      },
      ...buildRedirectToBasePath(ENV.ROUTES.PRODUCT_USERS),
    },
  },
};
