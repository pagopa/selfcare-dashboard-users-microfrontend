import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { DashboardApi } from '../api/DashboardApiClient';
import { Party, UserRole, UserStatus } from '../model/Party';
import { PartyGroup, usersGroupPlainResource2PartyGroup } from '../model/PartyGroup';
import {
  BasePartyUser,
  PartyProductUser,
  PartyUser,
  PartyUserDetail,
  PartyUserOnCreation,
  PartyUserOnEdit,
  PartyUserProduct,
  PartyUserProductRole,
  institutionUserResource2PartyUser,
  institutionUserResource2PartyUserDetail,
  productUserResource2PartyProductUser,
} from '../model/PartyUser';
import { Product, ProductsMap } from '../model/Product';
import { ProductRole } from '../model/ProductRole';
import { UserRegistry, userResource2UserRegistry } from '../model/UserRegistry';
import { ENV } from '../utils/env';
import {
  addUserProductRoles as addProductUserMocked,
  deletePartyUser as deletePartyUserMocked,
  fetchPartyProductUsers as fetchPartyProductUsersMocked,
  fetchPartyUser as fetchPartyUserMocked,
  fetchPartyUsers as fetchPartyUsersMocked,
  fetchUserGroups as fetchUserGroupsMocked,
  fetchUserRegistryById as fetchUserRegistryByIdMocked,
  mockedUserRegistry,
  savePartyUser as savePartyUserMocked,
  updatePartyUser as updatePartyUserMocked,
  updatePartyUserStatus as updatePartyUserStatusMocked,
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
    if (party.products.find((p) => product.id === p.productId && p.userRole === 'ADMIN')) {
      if (ENV.USER.ENABLE_USER_V2) {
        return DashboardApi.getPartyProductUsersV2(party.partyId, product.id).then((r) =>
          // TODO fixme when API will support pagination
          toFakePagination(
            r.map((u) => productUserResource2PartyProductUser(u, product, currentUser))
          )
        );
      }
      // This API is allowed only for ADMIN users
      return DashboardApi.getPartyProductUsers(
        party.partyId,
        product.id,
        selcRole,
        productRoles
        // eslint-disable-next-line sonarjs/no-identical-functions
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
): Promise<string | undefined> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return savePartyUserMocked(party, product, user);
  } else {
    return DashboardApi.savePartyUser(party.partyId, product.id, user).then(
      (idResource) => idResource.id
    );
  }
};

export const addUserProductRoles = (
  party: Party,
  product: Product,
  userId: string,
  user: PartyUserOnCreation
): Promise<string> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return addProductUserMocked(party, product, userId, user);
  } else {
    return DashboardApi.addUserProductRoles(party.partyId, product.id, userId, user).then(
      (_) => userId
    );
  }
};

export const updatePartyUser = (party: Party, user: PartyUserOnEdit): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return updatePartyUserMocked(party, user);
  } else {
    if (ENV.USER.ENABLE_USER_V2) {
      return DashboardApi.updatePartyUserV2(party.partyId, user);
    }
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
      product_id: product.id,
      product_role: user.userRole,
    });
    if (ENV.USER.ENABLE_USER_V2) {
      return DashboardApi.activatePartyRelationV2(user.id, party.partyId, product.id);
    } else {
      return DashboardApi.activatePartyRelation(role.relationshipId);
    }
  } else if (status === 'SUSPENDED') {
    trackEvent('USER_SUSPEND', {
      party_id: party.partyId,
      product_id: product.id,
      product_role: user.userRole,
    });
    if (ENV.USER.ENABLE_USER_V2) {
      return DashboardApi.suspendPartyRelationV2(user.id, party.partyId, product.id);
    } else {
      return DashboardApi.suspendPartyRelation(role.relationshipId);
    }
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
    product_id: product.id,
    product_role: role.role,
  });
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return deletePartyUserMocked(party, user, product, role);
  } else {
    if (ENV.USER.ENABLE_USER_V2) {
      return DashboardApi.deletePartyRelationV2(user.id, party.partyId, product.id);
    } else {
      return DashboardApi.deletePartyRelation(role.relationshipId);
    }
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
  partyId: string,
  userId: string
): Promise<UserRegistry | null> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return fetchUserRegistryByIdMocked(partyId, userId);
  } else {
    return DashboardApi.fetchUserRegistryById(partyId, userId).then((userResource) =>
      userResource ? userResource2UserRegistry(userResource) : null
    );
  }
};

export const fetchUserGroups = (
  party: Party,
  pageRequest: PageRequest,
  product: Product,
  userId: string
): Promise<Array<PartyGroup>> => {
  trackEvent('GET_USER_GROUPS', {
    party_id: party.partyId,
    product_id: product.id,
  });
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_GROUPS === 'true') {
    return fetchUserGroupsMocked(party, pageRequest, product, userId);
  } else {
    return DashboardApi.fetchUserGroups(party.partyId, pageRequest, product.id, userId).then(
      (resources) => resources.content.map(usersGroupPlainResource2PartyGroup) ?? []
    );
  }
};
