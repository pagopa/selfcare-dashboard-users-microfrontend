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
import { CheckUserResponse } from './generated/b4f-dashboard/CheckUserResponse';
import { WithDefaultsT, createClient } from './generated/b4f-dashboard/client';
import { InstitutionUserDetailsResource } from './generated/b4f-dashboard/InstitutionUserDetailsResource';
import { PageOfUserGroupPlainResource } from './generated/b4f-dashboard/PageOfUserGroupPlainResource';
import { ProductUserResource } from './generated/b4f-dashboard/ProductUserResource';
import { UserCountResource } from './generated/b4f-dashboard/UserCountResource';
import { UserIdResource } from './generated/b4f-dashboard/UserIdResource';
import { UserResource } from './generated/b4f-dashboard/UserResource';

const withBearerAndInstitutionId: WithDefaultsT<'bearerAuth'> =
  (wrappedOperation) => (params: any) => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZmFtaWx5X25hbWUiOiJTYXJ0b3JpIiwidWlkIjoiNTA5NmU0YzYtMjVhMS00NWQ1LTliZGYtMmZiOTc0YTdjMWM4Iiwic3BpZF9sZXZlbCI6Imh0dHBzOi8vd3d3LnNwaWQuZ292Lml0L1NwaWRMMiIsImlzcyI6IlNQSUQiLCJhdWQiOiJhcGkuZGV2LnNlbGZjYXJlLnBhZ29wYS5pdCIsImlhdCI6MTc0OTQ2MjQ2OCwiZXhwIjoxNzQ5NDk0ODY4LCJqdGkiOiI1YTdiMDViNi01OTI1LTRhYWMtYjdkMy0yNzMyM2U3M2RlMWIifQ.Ug7kAsZXrSqY0Bb6XzQ7MxowntbYrL4ogv692a90zWe3g8ljlyBucmgm4xvBOeZn4fmRYoRe89Z60KZk1_d0oOh5w2QmASN_QARSHe0nspc8KhBZYFFZaNmXgNgLQCtMc0UlvJ7JWH2e9wUf1NpMinsLPwUI9WY4BWlKjRWGs0aC1TKT5nYuOrV_JlDgD7xYn7CFRWpj0IQtOcMY0l83UBJHVuL3lJ2Ber1VA886ovb0cAiM2eSJwKjcGxsF4fB5CT1-h8v6lWFBtVOGX-0VT49tBE3eBrAUTYKjICziNVUUwd45yJEh-CgEbStrk4EJY_MykI5x4Y4GNh0pQmSM7g';
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

  getLegalRepresentative: async (
    institutionId: string,
    productId: string,
    roles: string
  ): Promise<Array<ProductUserResource>> => {
    const result = await apiClient.v2GetUsersUsingGET({
      institutionId,
      productId,
      roles,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },
  savePartyUser: async (
    institutionId: string,
    productId: string,
    user: PartyUserOnCreation,
    partyRole?: string
  ): Promise<UserIdResource> => {
    const result = await apiClient.v2PostCreateInstitutionProductUser({
      institutionId,
      productId,
      body: {
        productRoles: user.productRoles,
        role: partyRole,
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
    user: PartyUserOnCreation,
    partyRole?: string
  ): Promise<void> => {
    const result = await apiClient.v2AddUserProductRole({
      institutionId,
      productId,
      userId,
      body: {
        productRoles: user.productRoles,
        role: partyRole,
      },
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },

  updatePartyUser: async (institutionId: string, user: PartyUserOnEdit): Promise<void> => {
    const result = await apiClient.v2UpdateUserUsingPUT({
      institutionId,
      id: user.id,
      body: {
        email: user.email,
        name: user.certifiedName ? undefined : user.name,
        surname: user.certifiedSurname ? undefined : user.surname,
        mobilePhone: user.mobilePhone,
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
    const result = await apiClient.getUserGroupsUsingGET({
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
    const result = await apiClient.getUserGroupsUsingGET({
      institutionId,
      page: pageRequest.page,
      size: pageRequest.size,
      sort: pageRequest.sort ? [pageRequest.sort] : undefined,
      productId,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  addMemberToUserGroup: async (id: string, userId: string): Promise<void> => {
    const result = await apiClient.addMemberToUserGroupUsingPOST({
      id,
      userId,
    });
    return extractResponse(result, 204, onRedirectToLogin, 404);
  },

  getUserCount: async (
    institutionId: string,
    productId: string,
    roles?: string,
    status?: string
  ): Promise<UserCountResource> => {
    const result = await apiClient.v2GetUserCount({
      institutionId,
      productId,
      roles,
      status,
    });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  checkUser: async (
    institutionId: string,
    productId: string,
    fiscalCode: string
  ): Promise<CheckUserResponse> => {
    const result = await apiClient.v2CheckUser({ institutionId, productId, body: { fiscalCode } });
    return extractResponse(result, 200, onRedirectToLogin);
  },
};
