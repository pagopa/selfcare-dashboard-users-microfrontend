import { Redirect, useParams } from 'react-router';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
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

export const BASE_ROUTE = ENV.PUBLIC_URL;

export type RoutesObject = { [key: string]: RouteConfig };

export type RouteConfig = {
  path: string;
  exact?: boolean;
  subRoutes?: RoutesObject;
  component?: React.ComponentType<any>;
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
    path: `${BASE_ROUTE}/:institutionId/users`,
    exact: false,
    subRoutes: {
      MAIN: {
        path: `${BASE_ROUTE}/:institutionId/users`,
        exact: true,
        component: UsersPage,
      },
      EDIT_USER: {
        path: `${BASE_ROUTE}/:institutionId/users/:userId/edit`,
        exact: true,
        component: EditUserRegistryPage,
      },
      ADD_PARTY_USER: {
        path: `${BASE_ROUTE}/:institutionId/users/add`,
        exact: true,
        component: AddUsersPage,
      },
      ADD_PRODUCT: {
        path: `${BASE_ROUTE}/:institutionId/users/:userId/add-product`,
        exact: true,
        component: AddProductToUserPage,
      },
      PARTY_USER_DETAIL: {
        path: `${BASE_ROUTE}/:institutionId/users/:userId`,
        exact: true,
        component: UserDetailPage,
      },
      ...buildRedirectToBasePath(`${BASE_ROUTE}/:institutionId/users`),
    },
  },
  PARTY_PRODUCT_USERS: {
    path: `${BASE_ROUTE}/:institutionId/:productId/users`,
    exact: false,
    subRoutes: {
      MAIN: {
        path: `${BASE_ROUTE}/:institutionId/:productId/users`,
        exact: true,
        component: UsersProductPage,
      },
      EDIT_PARTY_PRODUCT_USER: {
        path: `${BASE_ROUTE}/:institutionId/:productId/users/:userId/edit`,
        exact: true,
        component: EditUserRegistryProductPage,
      },
      ADD_PARTY_PRODUCT_USER: {
        path: `${BASE_ROUTE}/:institutionId/:productId/users/add`,
        exact: true,
        component: AddUsersProductPage,
      },
      PARTY_PRODUCT_USER_DETAIL: {
        path: `${BASE_ROUTE}/:institutionId/:productId/users/:userId`,
        exact: true,
        component: UserProductDetailPage,
      },
      ...buildRedirectToBasePath(`${BASE_ROUTE}/:institutionId/:productId/users`),
    },
  },
};
