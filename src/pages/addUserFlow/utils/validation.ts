import { emailRegexp } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { verifyChecksumMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyChecksumMatchWithTaxCode';
import { verifyNameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyNameMatchWithTaxCode';
import { verifySurnameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifySurnameMatchWithTaxCode';
import { AsyncOnboardingUserData } from '../../../model/PartyUser';

export const taxCodeRegexp = new RegExp(
  '^[A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1}$'
);

export const requiredError = 'Required';

export const checkDuplicateTaxCodeWithDifferentEmail = (
  currentUser: Partial<AsyncOnboardingUserData>,
  asyncUserData: Array<AsyncOnboardingUserData>,
  t: any
): string | undefined => {
  if (!currentUser.taxCode || !currentUser.email) {
    return undefined;
  }

  const duplicateUser = asyncUserData.find(
    (user) => user.taxCode === currentUser.taxCode && user.email !== currentUser.email
  );

  if (duplicateUser) {
    return t('userEdit.addForm.addLegalRepresentative.duplicateTaxCodeDifferentEmail');
  }

  return undefined;
};

export const validateForm = (
  values: Partial<AsyncOnboardingUserData>,
  asyncUserData: Array<AsyncOnboardingUserData>,
  t: any
) => {
  const duplicateError = checkDuplicateTaxCodeWithDifferentEmail(values, asyncUserData, t);

  return Object.fromEntries(
    Object.entries({
      name: !values.name
        ? requiredError
        : verifyNameMatchWithTaxCode(values.name, values.taxCode)
        ? t('userEdit.mismatchWithTaxCode.name')
        : undefined,
      surname: !values.surname
        ? requiredError
        : verifySurnameMatchWithTaxCode(values.surname, values.taxCode)
        ? t('userEdit.mismatchWithTaxCode.surname')
        : undefined,
      taxCode: !values.taxCode
        ? requiredError
        : !taxCodeRegexp.test(values.taxCode) || verifyChecksumMatchWithTaxCode(values.taxCode)
        ? t('userEdit.addForm.errors.invalidFiscalCode')
        : duplicateError, // Add duplicate check here
      email: !values.email
        ? requiredError
        : !emailRegexp.test(values.email)
        ? t('userEdit.addForm.errors.invalidEmail')
        : undefined,
    }).filter(([_key, value]) => value)
  );
};

export const isFormValid = (errors: Record<string, any>) => Object.keys(errors).length === 0;
