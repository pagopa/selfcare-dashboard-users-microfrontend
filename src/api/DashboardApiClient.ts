import { storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import { appStateActions } from '@pagopa/selfcare-common-frontend/redux/slices/appStateSlice';
import { buildFetchApi, extractResponse } from '@pagopa/selfcare-common-frontend/utils/api-utils';
import { PartyUserOnCreation, PartyUserOnEdit } from '../model/PartyUser';
import { ENV } from '../utils/env';
import { ProductRole } from '../model/ProductRole';
import { createClient, WithDefaultsT } from './generated/b4f-dashboard/client';
import { InstitutionUserResource } from './generated/b4f-dashboard/InstitutionUserResource';
import { ProductUserResource } from './generated/b4f-dashboard/ProductUserResource';
import { UserResource } from './generated/b4f-dashboard/UserResource';
import { UserGroupPlainResource } from './generated/b4f-dashboard/UserGroupPlainResource';
import { InstitutionUserDetailsResource } from './generated/b4f-dashboard/InstitutionUserDetailsResource';

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
  getPartyUsers: async (
    institutionId: string,
    productId?: string,
    role?: string,
    productRoles?: Array<ProductRole>
  ): Promise<Array<InstitutionUserResource>> => {
    const result = await apiClient.getInstitutionUsersUsingGET({
      institutionId,
      role,
      productId,
      productRoles: productRoles?.map((r) => r.productRole).join(','),
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getPartyUser: async (
    institutionId: string,
    userId: string
  ): Promise<InstitutionUserDetailsResource | null> => {
    const result = await apiClient.getInstitutionUserUsingGET({ institutionId, userId });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  getPartyProductUsers: async (
    institutionId: string,
    productId: string,
    role?: string,
    productRoles?: Array<ProductRole>
  ): Promise<Array<ProductUserResource>> => {
    const result = await apiClient.getInstitutionProductUsersUsingGET({
      institutionId,
      productId,
      role,
      productRoles: productRoles?.map((r) => r.productRole).join(','),
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  savePartyUser: async (
    institutionId: string,
    productId: string,
    user: PartyUserOnCreation
  ): Promise<void> => {
    const result = await apiClient.createInstitutionProductUserUsingPOST({
      institutionId,
      productId,
      body: user,
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },

  updatePartyUser: async (institutionId: string, user: PartyUserOnEdit): Promise<void> => {
    const result = await apiClient.updateUserUsingPUT({
      institutionId,
      id: user.id,
      body: { email: user.email, fiscalCode: user.taxCode, name: user.name, surname: user.surname },
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },

  suspendPartyRelation: async (relationshipId: string): Promise<void> => {
    const result = await apiClient.suspendRelationshipUsingPOST({
      relationshipId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  activatePartyRelation: async (relationshipId: string): Promise<void> => {
    const result = await apiClient.activateRelationshipUsingPOST({
      relationshipId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  deletePartyRelation: async (relationshipId: string): Promise<void> => {
    const result = await apiClient.deleteRelationshipByIdUsingDELETE({
      relationshipId,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  fetchUserRegistryByFiscalCode: async (
    taxCode: string,
    institutionId: string
  ): Promise<UserResource | null> => {
    const result = await apiClient.getUserByExternalIdUsingPOST({
      institutionId,
      body: { externalId: taxCode },
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  fetchUserGroups: async (
    institutionId: string,
    productId: string,
    userId: string
  ): Promise<Array<UserGroupPlainResource>> => {
    const result = await apiClient.getUserGroupsUsingGET({
      institutionId,
      productId,
      userId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },
};
