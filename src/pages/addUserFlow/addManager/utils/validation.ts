import { emailRegexp } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { isPecEmail } from '@pagopa/selfcare-common-frontend/lib/utils/utils';
import { verifyChecksumMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyChecksumMatchWithTaxCode';
import { verifyNameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyNameMatchWithTaxCode';
import { verifySurnameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifySurnameMatchWithTaxCode';
import { RoleEnum } from '../../../../api/generated/onboarding/UserDto';
import { AddedUsersList } from '../../../../model/PartyUser';

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

const validateNameField = (name: string | undefined, taxCode: string | undefined, t: any) => {
  if (!name) {
    return t('userEdit.addForm.addLegalRepresentative.requiredError');
  }
  if (verifyNameMatchWithTaxCode(name, taxCode)) {
    return t('userEdit.mismatchWithTaxCode.name');
  }
  return undefined;
};

const validateSurnameField = (surname: string | undefined, taxCode: string | undefined, t: any) => {
  if (!surname) {
    return t('userEdit.addForm.addLegalRepresentative.requiredError');
  }
  if (verifySurnameMatchWithTaxCode(surname, taxCode)) {
    return t('userEdit.mismatchWithTaxCode.surname');
  }
  return undefined;
};

const validateTaxCodeField = (taxCode: string | undefined, t: any) => {
  if (!taxCode) {
    return t('userEdit.addForm.addLegalRepresentative.requiredError');
  }
  if (!taxCodeRegexp.test(taxCode) || verifyChecksumMatchWithTaxCode(taxCode)) {
    return t('userEdit.addForm.errors.invalidFiscalCode');
  }
  return undefined;
};

const validateEmailField = (
  manager: Partial<AddedUsersList>,
  addedUserList: Array<AddedUsersList>,
  t: any
) => {
  const { email } = manager;
  if (!email) {
    return t('userEdit.addForm.addLegalRepresentative.requiredError');
  }
  if (!emailRegexp.test(email)) {
    return t('userEdit.addForm.errors.invalidEmail');
  }
  if (isPecEmail(email)) {
    return t('userEdit.addForm.errors.invalidPecEmail');
  }
  return checkDuplicateTaxCodeWithDifferentEmail(manager, addedUserList, t);
};

export const validateManagerForm = (
  manager: Partial<AddedUsersList>,
  addedUserList: Array<AddedUsersList>,
  t: any
) => {
  const nameError = validateNameField(manager.name, manager.taxCode, t);
  const surnameError = validateSurnameField(manager.surname, manager.taxCode, t);
  const taxCodeError = validateTaxCodeField(manager.taxCode, t);
  const emailError = validateEmailField(manager, addedUserList, t);

  return Object.fromEntries(
    Object.entries({
      name: nameError,
      surname: surnameError,
      taxCode: taxCodeError,
      email: emailError,
    }).filter(([_key, value]) => value !== undefined)
  );
};
