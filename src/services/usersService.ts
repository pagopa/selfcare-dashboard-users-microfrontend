import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Party, UserRole, UserStatus } from '../model/Party';
import { Product, ProductsMap } from '../model/Product';
import {
  institutionUserResource2PartyUser,
  PartyUser,
  PartyUserOnCreation,
  PartyUserOnEdit,
  PartyUserProduct,
  PartyUserProductRole,
  productUserResource2PartyUser,
} from '../model/PartyUser';
import { ProductRole } from '../model/ProductRole';
import { UserRegistry, userResource2UserRegistry } from '../model/UserRegistry';
import { DashboardApi } from '../api/DashboardApiClient';
import { PartyGroup, usersGroupPlainResource2PartyGroup } from '../model/PartyGroup';
import {
  fetchPartyUsers as fetchPartyUsersMocked,
  savePartyUser as savePartyUserMocked,
  updatePartyUser as updatePartyUserMocked,
  updatePartyUserStatus as updatePartyUserStatusMocked,
  deletePartyUser as deletePartyUserMocked,
  fetchPartyUser as fetchPartyUserMocked,
  fetchUserGroups as fetchUserGroupsMocked,
  mockedUserRegistry,
} from './__mocks__/usersService';

const toFakePagination = <T>(content: Array<T>): PageResource<T> => ({
  content,
  page: {
    number: 0,
    size: content.length,
    totalElements: content.length,
    totalPages: 1,
  },
});

export const fetchPartyUsers = (
  pageRequest: PageRequest,
  party: Party,
  productsMap: ProductsMap,
  currentUser: User,
  checkPermission: boolean,
  product?: Product,
  selcRole?: UserRole,
  productRoles?: Array<ProductRole>
): Promise<PageResource<PartyUser>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return fetchPartyUsersMocked(
      pageRequest,
      party,
      currentUser,
      checkPermission,
      product,
      selcRole,
      productRoles
    );
  } else {
    if (product && checkPermission) {
      return DashboardApi.getPartyProductUsers(
        party.institutionId,
        product.id,
        selcRole,
        productRoles
      ).then(
        (
          r // TODO fixme when API will support pagination
        ) => toFakePagination(r.map((u) => productUserResource2PartyUser(u, product, currentUser)))
      );
    } else {
      return DashboardApi.getPartyUsers(
        party.institutionId,
        product?.id,
        selcRole,
        productRoles
      ).then(
        (
          r // TODO fixme when API will support pagination
        ) =>
          toFakePagination(
            r.map((u) => institutionUserResource2PartyUser(u, productsMap, currentUser))
          )
      );
    }
  }
};

export const fetchPartyUser = (
  institutionId: string,
  userId: string,
  currentUser: User,
  productsMap: ProductsMap
): Promise<PartyUser | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return fetchPartyUserMocked(institutionId, userId, currentUser);
  } else {
    return DashboardApi.getPartyUser(institutionId, userId).then((u) => {
      if (u) {
        return institutionUserResource2PartyUser(u, productsMap, currentUser);
      } else {
        return null;
      }
    });
  }
};

export const savePartyUser = (
  party: Party,
  product: Product,
  user: PartyUserOnCreation
): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return savePartyUserMocked(party, product, user);
  } else {
    return DashboardApi.savePartyUser(party.institutionId, product.id, user);
  }
};

export const updatePartyUser = (party: Party, user: PartyUserOnEdit): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return updatePartyUserMocked(party, user);
  } else {
    return DashboardApi.updatePartyUser(party.institutionId, user);
  }
};

export const updatePartyUserStatus = (
  party: Party,
  user: PartyUser,
  product: PartyUserProduct,
  role: PartyUserProductRole,
  status: UserStatus
): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return updatePartyUserStatusMocked(party, user, product, role, status);
  }
  if (status === 'ACTIVE') {
    trackEvent('USER_RESUME', {
      party_id: party.institutionId,
      product: product.id,
      product_role: user.userRole,
    });
    return DashboardApi.activatePartyRelation(role.relationshipId);
  } else if (status === 'SUSPENDED') {
    trackEvent('USER_SUSPEND', {
      party_id: party.institutionId,
      product: product.id,
      product_role: user.userRole,
    });
    return DashboardApi.suspendPartyRelation(role.relationshipId);
  } else {
    throw new Error(`Not allowed next status: ${status}`);
  }
};

export const deletePartyUser = (
  party: Party,
  user: PartyUser,
  product: PartyUserProduct,
  role: PartyUserProductRole
): Promise<any> => {
  trackEvent('USER_DELETE', {
    party_id: party.institutionId,
    product: product.id,
    product_role: role.role,
  });
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return deletePartyUserMocked(party, user, product, role);
  } else {
    return DashboardApi.deletePartyRelation(role.relationshipId);
  }
};

export const fetchUserRegistryByFiscalCode = (
  taxCode: string,
  institutionId: string
): Promise<UserRegistry | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return new Promise((resolve) => resolve(mockedUserRegistry));
  } else {
    return DashboardApi.fetchUserRegistryByFiscalCode(taxCode, institutionId).then((userResource) =>
      userResource ? userResource2UserRegistry(userResource) : null
    );
  }
};

export const fetchUserGroups = (
  userId: string,
  party: Party,
  product: Product
): Promise<Array<PartyGroup>> => {
  trackEvent('GET_USER_GROUPS', {
    party_id: party.institutionId,
    product: product.id,
  });
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_GROUPS === 'true') {
    return fetchUserGroupsMocked(party, product, userId);
  } else {
    return DashboardApi.fetchUserGroups(party.institutionId, product.id, userId).then(
      (resources) => resources?.map(usersGroupPlainResource2PartyGroup) ?? []
    );
  }
};
