import { CheckManagerDto } from '../api/generated/onboarding/CheckManagerDto';
import { OnboardingUserDto } from '../api/generated/onboarding/OnboardingUserDto';
import { UserDataValidationDto } from '../api/generated/onboarding/UserDataValidationDto';
import { UserTaxCodeDto } from '../api/generated/onboarding/UserTaxCodeDto';
import { OnboardingApi } from '../api/OnboardingApiClient';
import {
  checkManagerMocked,
  onboardingPostUserMocked,
  searchUserMocked,
  validateLegalRepresentativeMocked,
} from './__mocks__/usersService';

export const searchUserService = (userTaxCode: UserTaxCodeDto): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return searchUserMocked(userTaxCode);
  } else {
    return OnboardingApi.searchUserApi(userTaxCode);
  }
};

export const checkManagerService = (user: CheckManagerDto): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return checkManagerMocked(user);
  } else {
    return OnboardingApi.checkManagerApi(user);
  }
};

export const validateLegalRepresentative = (user: UserDataValidationDto): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return validateLegalRepresentativeMocked(user);
  } else {
    return OnboardingApi.validateLegalRepresentative(user);
  }
};

export const onboardingPostUser = (user: OnboardingUserDto): Promise<any> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return onboardingPostUserMocked(user);
  } else {
    return OnboardingApi.onboardingPostUser(user);
  }
};

export const onboardingAggregatorService = (user: OnboardingUserDto) => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return onboardingPostUserMocked(user);
  } else {
    return OnboardingApi.onboardingAggregatorPOST(user);
  }
};
