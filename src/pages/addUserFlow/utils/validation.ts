import { emailRegexp } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { verifyChecksumMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyChecksumMatchWithTaxCode';
import { verifyNameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyNameMatchWithTaxCode';
import { verifySurnameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifySurnameMatchWithTaxCode';
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
  if (!manager.taxCode || !manager.email) {
    return undefined;
  }

  const duplicateUser = addedUserList.find(
    (user) => user.taxCode === manager.taxCode && user.email !== manager.email
  );

  if (duplicateUser) {
    return t('userEdit.addForm.addLegalRepresentative.duplicateTaxCodeDifferentEmail');
  }

  return undefined;
};

export const validateManagerForm = (
  manager: Partial<AddedUsersList>,
  addedUserList: Array<AddedUsersList>,
  t: any
) => {
  const duplicateError = checkDuplicateTaxCodeWithDifferentEmail(manager, addedUserList, t);

  return Object.fromEntries(
    Object.entries({
      name: !manager.name
        ? requiredError
        : verifyNameMatchWithTaxCode(manager.name, manager.taxCode)
        ? t('userEdit.mismatchWithTaxCode.name')
        : undefined,
      surname: !manager.surname
        ? requiredError
        : verifySurnameMatchWithTaxCode(manager.surname, manager.taxCode)
        ? t('userEdit.mismatchWithTaxCode.surname')
        : undefined,
      taxCode: !manager.taxCode
        ? requiredError
        : !taxCodeRegexp.test(manager.taxCode) || verifyChecksumMatchWithTaxCode(manager.taxCode)
        ? t('userEdit.addForm.errors.invalidFiscalCode')
        : duplicateError,
      email: !manager.email
        ? requiredError
        : !emailRegexp.test(manager.email)
        ? t('userEdit.addForm.errors.invalidEmail')
        : undefined,
    }).filter(([_key, value]) => value)
  );
};

export const isFormValid = (errors: Record<string, any>) => Object.keys(errors).length === 0;
