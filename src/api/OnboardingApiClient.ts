import { appStateActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/appStateSlice';
import {
  buildFetchApi,
  extractResponse,
} from '@pagopa/selfcare-common-frontend/lib/utils/api-utils';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { ENV } from '../utils/env';
import { CheckManagerDto } from './generated/onboarding/CheckManagerDto';
import { createClient, WithDefaultsT } from './generated/onboarding/client';
import { OnboardingUserDto } from './generated/onboarding/OnboardingUserDto';
import { UserDataValidationDto } from './generated/onboarding/UserDataValidationDto';
import { UserTaxCodeDto } from './generated/onboarding/UserTaxCodeDto';

const withBearerAndInstitutionId: WithDefaultsT<'bearerAuth'> =
  (wrappedOperation) => (params: any) => {
    const token = storageTokenOps.read();
    return wrappedOperation({
      ...params,
      bearerAuth: `Bearer ${token}`,
    });
  };

const apiClient = createClient({
  baseUrl: ENV.URL_API.API_ONBOARDING_V2,
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

export const OnboardingApi = {
  searchUserApi: async (user: UserTaxCodeDto): Promise<any> => {
    const result = await apiClient.searchUserId({ body: user });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  checkManagerApi: async (user: CheckManagerDto): Promise<any> => {
    const result = await apiClient.checkManager({ body: user });
    return extractResponse(result, 200, onRedirectToLogin);
  },

  validateLegalRepresentative: async (user: UserDataValidationDto): Promise<any> => {
    const result = await apiClient.validateUsingPOST({
      body: {
        taxCode: user.taxCode,
        name: user.name,
        surname: user.surname,
      } as UserDataValidationDto,
    });
    return extractResponse(result, 204, onRedirectToLogin);
  },

  onboardingPostUser: async (user: OnboardingUserDto): Promise<any> => {
    const result = await apiClient.onboardingUsers({
      body: user,
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },

  onboardingAggregatorPOST: async (user: OnboardingUserDto): Promise<any> => {
    const result = await apiClient.onboardingAggregatorUsingPOST({
      body: user,
    });
    return extractResponse(result, 201, onRedirectToLogin);
  },
};
