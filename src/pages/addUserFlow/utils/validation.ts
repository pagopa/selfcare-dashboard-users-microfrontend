import { emailRegexp } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { verifyChecksumMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyChecksumMatchWithTaxCode';
import { verifyNameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyNameMatchWithTaxCode';
import { verifySurnameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifySurnameMatchWithTaxCode';
import { RoleEnum } from '../../../api/generated/onboarding/UserDto';
import { AddedUsersList } from '../../../model/PartyUser';

export const taxCodeRegexp = new RegExp(
  '^[A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1}$'
);

export const requiredError = 'Required';

export const checkDuplicateTaxCodeWithDifferentEmail = (
  manager: Partial<AddedUsersList>,
  addedUserList: Array<AddedUsersList>,
  t: any
): string | undefined => {
  const delegate = addedUserList.find((user) => user.role === RoleEnum.DELEGATE);

  const duplicateUserWithDifferentEmail =
    manager.taxCode === delegate?.taxCode && manager.email !== delegate?.email;

  if (duplicateUserWithDifferentEmail) {
    return t('userEdit.addForm.addLegalRepresentative.duplicateTaxCodeDifferentEmail');
  }

  return undefined;
};

export const validateName = (
  name: string | undefined,
  taxCode: string | undefined,
  t: (key: string) => string
) => {
  if (!name) {
    return requiredError;
  }
  if (verifyNameMatchWithTaxCode(name, taxCode)) {
    return t('userEdit.mismatchWithTaxCode.name');
  }
  return undefined;
};

export const validateSurname = (
  surname: string | undefined,
  taxCode: string | undefined,
  t: (key: string) => string
) => {
  if (!surname) {
    return requiredError;
  }
  if (verifySurnameMatchWithTaxCode(surname, taxCode)) {
    return t('userEdit.mismatchWithTaxCode.surname');
  }
  return undefined;
};

export const validateTaxCode = (taxCode: string | undefined, t: (key: string) => string) => {
  if (!taxCode) {
    return requiredError;
  }
  if (!taxCodeRegexp.test(taxCode) || verifyChecksumMatchWithTaxCode(taxCode)) {
    return t('userEdit.addForm.errors.invalidFiscalCode');
  }
  return undefined;
};

export const validateManagerForm = (
  manager: Partial<AddedUsersList>,
  addedUserList: Array<AddedUsersList>,
  t: any
) => {
  const duplicateError = checkDuplicateTaxCodeWithDifferentEmail(manager, addedUserList, t);
  const requiredField = t('userEdit.addForm.addLegalRepresentative.requiredError');

  return Object.fromEntries(
    Object.entries({
      name: validateName(manager.name, manager.taxCode, t),
      surname: validateSurname(manager.surname, manager.taxCode, t),
      taxCode: validateTaxCode(manager.taxCode, t),
      email: !manager.email
        ? requiredField
        : !emailRegexp.test(manager.email)
        ? t('userEdit.addForm.errors.invalidEmail')
        : duplicateError,
    }).filter(([_key, value]) => value)
  );
};
