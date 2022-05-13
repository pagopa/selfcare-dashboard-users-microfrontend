import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Party, UserRole, UserStatus } from '../model/Party';
import { Product, ProductsMap } from '../model/Product';
import {
  BasePartyUser,
  institutionUserResource2PartyUser,
  institutionUserResource2PartyUserDetail,
  PartyProductUser,
  PartyUser,
  PartyUserDetail,
  PartyUserOnCreation,
  PartyUserOnEdit,
  PartyUserProduct,
  PartyUserProductRole,
  productUserResource2PartyProductUser,
} from '../model/PartyUser';
import { ProductRole } from '../model/ProductRole';
import { UserRegistry, userResource2UserRegistry } from '../model/UserRegistry';
import { DashboardApi } from '../api/DashboardApiClient';
import { PartyGroup, usersGroupPlainResource2PartyGroup } from '../model/PartyGroup';
import {
  fetchPartyUsers as fetchPartyUsersMocked,
  fetchPartyProductUsers as fetchPartyProductUsersMocked,
  savePartyUser as savePartyUserMocked,
  updatePartyUser as updatePartyUserMocked,
  updatePartyUserStatus as updatePartyUserStatusMocked,
  deletePartyUser as deletePartyUserMocked,
  fetchPartyUser as fetchPartyUserMocked,
  fetchUserRegistryById as fetchUserRegistryByIdMocked,
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
  product?: Product,
  selcRole?: UserRole,
  productRoles?: Array<ProductRole>
): Promise<PageResource<PartyUser>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return fetchPartyUsersMocked(pageRequest, party, currentUser, product, selcRole, productRoles);
  } else {
    return DashboardApi.getPartyUsers(party.partyId, product?.id, selcRole, productRoles).then(
      (r) =>
        // TODO fixme when API will support pagination
        toFakePagination(
          r.map((u) => institutionUserResource2PartyUser(u, productsMap, currentUser))
        )
    );
  }
};

export const fetchPartyProductUsers = (
  pageRequest: PageRequest,
  party: Party,
  product: Product,
  currentUser: User,
  productsMap: ProductsMap,
  selcRole?: UserRole,
  productRoles?: Array<ProductRole>
): Promise<PageResource<PartyProductUser>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return fetchPartyProductUsersMocked(
      pageRequest,
      party,
      product,
      currentUser,
      productsMap,
      selcRole,
      productRoles
    );
  } else {
    if (product.userRole === 'ADMIN') {
      // This API is allowed only for ADMIN users
      return DashboardApi.getPartyProductUsers(
        party.partyId,
        product.id,
        selcRole,
        productRoles
      ).then((r) =>
        // TODO fixme when API will support pagination
        toFakePagination(
          r.map((u) => productUserResource2PartyProductUser(u, product, currentUser))
        )
      );
    } else {
      return fetchPartyUsers(
        pageRequest,
        party,
        productsMap,
        currentUser,
        product,
        selcRole,
        productRoles
      ).then((result) => ({
        page: result.page,
        content: result.content.map((partyUser) => ({
          ...partyUser,
          product: partyUser.products.find((p) => p.id === product.id) as PartyUserProduct,
        })),
      }));
    }
  }
};

export const fetchPartyUser = (
  partyId: string,
  userId: string,
  currentUser: User,
  productsMap: ProductsMap
): Promise<PartyUserDetail | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return fetchPartyUserMocked(partyId, userId, currentUser);
  } else {
    return DashboardApi.getPartyUser(partyId, userId).then((u) => {
      if (u) {
        return institutionUserResource2PartyUserDetail(u, productsMap, currentUser);
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
    return DashboardApi.savePartyUser(party.partyId, product.id, user);
  }
};

export const updatePartyUser = (party: Party, user: PartyUserOnEdit): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return updatePartyUserMocked(party, user);
  } else {
    return DashboardApi.updatePartyUser(party.partyId, user);
  }
};

export const updatePartyUserStatus = (
  party: Party,
  user: BasePartyUser,
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
      party_id: party.partyId,
      product: product.id,
      product_role: user.userRole,
    });
    return DashboardApi.activatePartyRelation(role.relationshipId);
  } else if (status === 'SUSPENDED') {
    trackEvent('USER_SUSPEND', {
      party_id: party.partyId,
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
  user: BasePartyUser,
  product: PartyUserProduct,
  role: PartyUserProductRole
): Promise<any> => {
  trackEvent('USER_DELETE', {
    party_id: party.partyId,
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
  partyId: string
): Promise<UserRegistry | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return new Promise((resolve) => resolve(mockedUserRegistry));
  } else {
    return DashboardApi.fetchUserRegistryByFiscalCode(taxCode, partyId).then((userResource) =>
      userResource ? userResource2UserRegistry(userResource) : null
    );
  }
};

export const fetchUserRegistryById = (
  id: string,
  institutionId: string
): Promise<UserRegistry | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return fetchUserRegistryByIdMocked(id, institutionId);
  } else {
    return DashboardApi.fetchUserRegistryById(id, institutionId).then((userResource) =>
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
    party_id: party.partyId,
    product: product.id,
  });
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_GROUPS === 'true') {
    return fetchUserGroupsMocked(party, product, userId);
  } else {
    return DashboardApi.fetchUserGroups(party.partyId, product.id, userId).then(
      (resources) => resources?.map(usersGroupPlainResource2PartyGroup) ?? []
    );
  }
};
