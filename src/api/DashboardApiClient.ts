import { PageRequest } from '@pagopa/selfcare-common-frontend/lib/model/PageRequest';
import { appStateActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/appStateSlice';
import {
  buildFetchApi,
  extractResponse,
} from '@pagopa/selfcare-common-frontend/lib/utils/api-utils';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { EmailString } from '@pagopa/ts-commons/lib/strings';
import { PartyUserOnCreation, PartyUserOnEdit } from '../model/PartyUser';
import { ProductRole } from '../model/ProductRole';
import { ENV } from '../utils/env';
import { InstitutionUserDetailsResource } from './generated/b4f-dashboard/InstitutionUserDetailsResource';
import { PageOfUserGroupPlainResource } from './generated/b4f-dashboard/PageOfUserGroupPlainResource';
import { ProductUserResource } from './generated/b4f-dashboard/ProductUserResource';
import { UserIdResource } from './generated/b4f-dashboard/UserIdResource';
import { UserResource } from './generated/b4f-dashboard/UserResource';
import { WithDefaultsT, createClient } from './generated/b4f-dashboard/client';

const withBearerAndInstitutionId: WithDefaultsT<'bearerAuth'> =
  (wrappedOperation) => (params: any) => {
    const token = storageTokenOps.read();
    return wrappedOperation({
      ...params,
      bearerAuth: `Bearer ${token}`,
    });
  };

const apiClient = createClient({
  baseUrl: ENV.URL_API.API_DASHBOARD,
  basePath: '',
  fetchApi: buildFetchApi(ENV.API_TIMEOUT_MS.DASHBOARD),
  withDefaults: withBearerAndInstitutionId,
});

const onRedirectToLogin = () =>
  ENV.STORE.dispatch(
    appStateActions.addError({
      id: 'tokenNotValid',
      error: new Error(),
      techDescription: 'token expired or not valid',
      toNotify: false,
      blocking: false,
      displayableTitle: ENV.i18n.t('session.expired.title'),
      displayableDescription: ENV.i18n.t('session.expired.message'),
    })
  );

export const DashboardApi = {

  getPartyUser: async (
    institutionId: string,
    userId: string
  ): Promise<InstitutionUserDetailsResource | null> => {
    const result = await apiClient.v2RetrieveInstitutionUser({ institutionId, userId });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  fetchUserRegistryById: async (
    institutionId: string,
    userId: string
  ): Promise<UserResource | null> => {
    const result = await apiClient.v2GetUserByIdUsingGET({ institutionId, id: userId });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getPartyProductUsers: async (
    institutionId: string,
    productId?: string,
    productRoles?: Array<ProductRole>
  ): Promise<Array<ProductUserResource>> => {
    const result = await apiClient.v2GetUsersUsingGET({
      institutionId,
      productId,
      productRoles: productRoles?.map((r) => r.productRole).join(','),
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  savePartyUser: async (
    institutionId: string,
    productId: string,
    user: PartyUserOnCreation
  ): Promise<UserIdResource> => {
    const result = await apiClient.v2PostCreateInstitutionProductUser({
      institutionId,
      productId,
      body: {
        productRoles: user.productRoles,
        taxCode: user.taxCode,
        email: (user.certifiedMail ? undefined : user.email) as EmailString,
        surname: user.certifiedSurname ? undefined : user.surname,
        name: user.certifiedName ? undefined : user.name,
      },
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },

  addUserProductRoles: async (
    institutionId: string,
    productId: string,
    userId: string,
    user: PartyUserOnCreation
  ): Promise<void> => {
    const result = await apiClient.v2AddUserProductRole({
      institutionId,
      productId,
      userId,
      body: {
        productRoles: user.productRoles,
      },
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },

  updatePartyUser: async (institutionId: string, user: PartyUserOnEdit): Promise<void> => {
    const result = await apiClient.v2UpdateUserUsingPUT({
      institutionId,
      id: user.id,
      body: {
        email: user.certifiedMail ? undefined : user.email,
        name: user.certifiedName ? undefined : user.name,
        surname: user.certifiedSurname ? undefined : user.surname,
      },
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  suspendPartyRelation: async (
    userId: string,
    institutionId: string,
    productId: string,
    productRole?: string
  ): Promise<void> => {
    const result = await apiClient.v2SuspendRelationshipUsingPOST({
      userId,
      institutionId,
      productId,
      productRole,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  activatePartyRelation: async (
    userId: string,
    institutionId: string,
    productId: string,
    productRole?: string
  ): Promise<void> => {
    const result = await apiClient.v2ActivateRelationshipUsingPOST({
      userId,
      institutionId,
      productId,
      productRole,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  deletePartyRelation: async (
    userId: string,
    institutionId: string,
    productId: string,
    productRole?: string
  ): Promise<void> => {
    const result = await apiClient.v2DeleteRelationshipByIdUsingDELETE({
      userId,
      institutionId,
      productId,
      productRole,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  fetchUserRegistryByFiscalCode: async (
    taxCode: string,
    institutionId: string
  ): Promise<UserResource | null> => {
    const result = await apiClient.v2SearchUserByFiscalCodeUsingPOST({
      institutionId,
      body: { fiscalCode: taxCode },
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },


  fetchUserGroups: async (
    institutionId: string,
    pageRequest: PageRequest,
    productId: string,
    userId: string
  ): Promise<PageOfUserGroupPlainResource> => {
    const result = await apiClient.getUserGroupsUsingGET_1({
      institutionId,
      page: pageRequest.page,
      size: pageRequest.size,
      sort: pageRequest.sort ? [pageRequest.sort] : undefined,
      productId,
      userId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  fetchPartyGroups: async (
    productId: string,
    institutionId: string,
    pageRequest: PageRequest
  ): Promise<PageOfUserGroupPlainResource> => {
    const result = await apiClient.getUserGroupsUsingGET_1({
      institutionId,
      page: pageRequest.page,
      size: pageRequest.size,
      sort: pageRequest.sort ? [pageRequest.sort] : undefined,
      productId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  addMemberToUserGroup: async (id: string, userId: string): Promise<void> => {
    const result = await apiClient.addMemberToUserGroupUsingPOST_1({
      id,
      userId,
    });
    return extractResponse(result, 204, onRedirectToLogin, 404);
  },
};
