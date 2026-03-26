import { PageRequest } from '@pagopa/selfcare-common-frontend/lib/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/lib/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { isPagoPaUser } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { DashboardApi } from '../api/DashboardApiClient';
import { CheckUserResponse } from '../api/generated/b4f-dashboard/CheckUserResponse';
import { InstitutionUserDetailsResource } from '../api/generated/b4f-dashboard/InstitutionUserDetailsResource';
import { ProductRoleInfoResource } from '../api/generated/b4f-dashboard/ProductRoleInfoResource';
import { ProductUserResource } from '../api/generated/b4f-dashboard/ProductUserResource';
import { UserCountResource } from '../api/generated/b4f-dashboard/UserCountResource';
import { Party, UserRole, UserStatus } from '../model/Party';
import { PartyGroup, usersGroupPlainResource2PartyGroup } from '../model/PartyGroup';
import {
  AllUserInfo,
  BasePartyUser,
  PartyProductUser,
  PartyUserDetail,
  PartyUserOnCreation,
  PartyUserOnEdit,
  PartyUserProduct,
  institutionUserResource2PartyUserDetail,
  productUserResource2PartyProductUser,
  userInstitutionInfo2GetAllUsers,
} from '../model/PartyUser';
import { Product, ProductsMap } from '../model/Product';
import { ProductRole } from '../model/ProductRole';
import { UserRegistry, userResource2UserRegistry } from '../model/UserRegistry';
import {
  addUserProductRoles as addProductUserMocked,
  checkUserServiceMocked,
  deletePartyUser as deletePartyUserMocked,
  fetchPartyProductUsers as fetchPartyProductUsersMocked,
  fetchPartyUser as fetchPartyUserMocked,
  fetchUserGroups as fetchUserGroupsMocked,
  fetchUserRegistryById as fetchUserRegistryByIdMocked,
  getAllUsersServiceMocked,
  getLegalRepresentativeServiceMocked,
  getUserCountServiceMocked,
  mockedUserRegistry,
  savePartyUser as savePartyUserMocked,
  toFakePagination,
  updatePartyUser as updatePartyUserMocked,
  updatePartyUserStatus as updatePartyUserStatusMocked,
} from './__mocks__/usersService';

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
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
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
    return DashboardApi.getPartyProductUsers(party.partyId, product.id, productRoles).then((r) =>
      // TODO fixme when API will support pagination
      toFakePagination(r.map((u) => productUserResource2PartyProductUser(u, product, currentUser)))
    );
  }
};

export const getAllUsersService = (
  pageRequest: PageRequest,
  party: Party,
  product: Product,
  currentUser: User,
  productsMap: ProductsMap,
  states?: string,
  roles?: string
): Promise<PageResource<AllUserInfo>> => {
  /* istanbul ignore if */
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
    return getAllUsersServiceMocked(
      pageRequest,
      party,
      product,
      currentUser,
      productsMap,
      states,
      roles
    );
  } else {
    return DashboardApi.getAllUsers(party.partyId, product.id, states, roles).then((r) =>
      // TODO fixme when API will support pagination
      toFakePagination(r.map((user) => userInstitutionInfo2GetAllUsers(user, currentUser)))
    );
  }
};

export const getLegalRepresentativeService = (
  party: Party,
  productId: string,
  roles: string
): Promise<Array<ProductUserResource>> => {
  /* istanbul ignore if */
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
    return getLegalRepresentativeServiceMocked(party.partyId, productId, roles);
  } else {
    return DashboardApi.getLegalRepresentative(party.partyId, productId, roles).then((r) => r);
  }
};
// function to remove duplication of fetchPartyUser and fetchAllInstitutionUser
const fetchUserDetail = (
  partyId: string,
  userId: string,
  currentUser: User,
  productsMap: ProductsMap,
  fetchApi: (
    institutionId: string,
    userId: string
  ) => Promise<InstitutionUserDetailsResource | null>
): Promise<PartyUserDetail | null> => {
  /* istanbul ignore if */
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
    return fetchPartyUserMocked(partyId, userId, currentUser);
  } else {
    return fetchApi(partyId, userId).then((u) =>
      u ? institutionUserResource2PartyUserDetail(u, productsMap, currentUser) : null
    );
  }
};

export const fetchPartyUser = (
  partyId: string,
  userId: string,
  currentUser: User,
  productsMap: ProductsMap
): Promise<PartyUserDetail | null> =>
  fetchUserDetail(
    partyId,
    userId,
    currentUser,
    productsMap,
    isPagoPaUser() ? DashboardApi.getAllInstitutionUser : DashboardApi.getPartyUser
  );

export const savePartyUser = (
  party: Party,
  product: Product,
  user: PartyUserOnCreation,
  partyRole?: string
): Promise<string | undefined> => {
  /* istanbul ignore if */
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
    return savePartyUserMocked(party, product, user, partyRole);
  } else {
    return DashboardApi.savePartyUser(party.partyId, product.id, user, partyRole).then(
      (idResource) => idResource.id
    );
  }
};

export const addUserProductRoles = (
  party: Party,
  product: Product,
  userId: string,
  user: PartyUserOnCreation,
  partyRole?: string
): Promise<string> => {
  /* istanbul ignore if */
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
    return addProductUserMocked(party, product, userId, user, partyRole);
  } else {
    return DashboardApi.addUserProductRoles(
      party.partyId,
      product.id,
      userId,
      user,
      partyRole
    ).then((_) => userId);
  }
};

export const updatePartyUser = (party: Party, user: PartyUserOnEdit): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
    return updatePartyUserMocked(party, user);
  } else {
    return DashboardApi.updatePartyUser(party.partyId, user);
  }
};

export const updatePartyUserStatus = (
  party: Party,
  user: BasePartyUser,
  product: PartyUserProduct,
  role: ProductRoleInfoResource,
  status: UserStatus
): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
    return updatePartyUserStatusMocked(party, user, product, role, status);
  }
  if (status === 'ACTIVE') {
    trackEvent('USER_RESUME', {
      party_id: party.partyId,
      product_id: product.id,
      product_role: user.userRole,
    });
    return DashboardApi.activatePartyRelation(user.id, party.partyId, product.id, role.role);
  } else if (status === 'SUSPENDED') {
    trackEvent('USER_SUSPEND', {
      party_id: party.partyId,
      product_id: product.id,
      product_role: user.userRole,
    });

    return DashboardApi.suspendPartyRelation(user.id, party.partyId, product.id, role.role);
  } else {
    throw new Error(`Not allowed next status: ${status}`);
  }
};

export const deletePartyUser = (
  party: Party,
  user: BasePartyUser,
  product: PartyUserProduct,
  role: ProductRoleInfoResource
): Promise<any> => {
  trackEvent('USER_DELETE', {
    party_id: party.partyId,
    product_id: product.id,
    product_role: role.role,
  });
  /* istanbul ignore if */
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
    return deletePartyUserMocked(party, user, product, role);
  } else {
    return DashboardApi.deletePartyRelation(user.id, party.partyId, product.id, role.role);
  }
};

export const fetchUserRegistryByFiscalCode = (
  taxCode: string,
  partyId: string
): Promise<UserRegistry | null> => {
  /* istanbul ignore if */
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
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
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
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
  if (process.env.VITE_API_MOCK_PARTY_GROUPS === 'true') {
    return fetchUserGroupsMocked(party, pageRequest, product, userId);
  } else {
    return DashboardApi.fetchUserGroups(party.partyId, pageRequest, product.id, userId).then(
      (resources) => resources.content.map(usersGroupPlainResource2PartyGroup) ?? []
    );
  }
};

export const getUserCountService = (
  institutionId: string,
  productId: string,
  roles?: string,
  status?: string
): Promise<UserCountResource> => {
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
    return getUserCountServiceMocked(institutionId, productId, roles, status);
  } else {
    return DashboardApi.getUserCount(institutionId, productId, roles, status);
  }
};

export const checkUserService = (
  institutionId: string,
  productId: string,
  fiscalCode: string
): Promise<CheckUserResponse> => {
  if (process.env.VITE_API_MOCK_PARTY_USERS === 'true') {
    return checkUserServiceMocked(institutionId, productId, fiscalCode);
  } else {
    return DashboardApi.checkUser(institutionId, productId, fiscalCode);
  }
};
