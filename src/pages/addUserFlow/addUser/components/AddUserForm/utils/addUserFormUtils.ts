import { emailRegexp } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { verifyChecksumMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyChecksumMatchWithTaxCode';
import { verifyNameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyNameMatchWithTaxCode';
import { verifySurnameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifySurnameMatchWithTaxCode';
import { PartyUserOnCreation } from '../../../../../../model/PartyUser';
import { UserRegistry } from '../../../../../../model/UserRegistry';
import { requiredError, taxCodeRegexp } from '../../../../utils/validation';

// Pure validation utilities
export const validateUserForm = (
  values: Partial<PartyUserOnCreation>,
  t: (key: string) => string
  // eslint-disable-next-line sonarjs/cognitive-complexity
) =>
  Object.fromEntries(
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
        : undefined,
      email: !values.email
        ? requiredError
        : !emailRegexp.test(values.email)
        ? t('userEdit.addForm.errors.invalidEmail')
        : undefined,
      confirmEmail: !values.confirmEmail
        ? requiredError
        : values.email &&
          values.confirmEmail.toLocaleLowerCase() !== values.email.toLocaleLowerCase()
        ? t('userEdit.addForm.errors.mismatchEmail')
        : undefined,
      productRoles: values.productRoles?.length === 0 ? requiredError : undefined,
    }).filter(([_key, value]) => value)
  );

// Pure utility functions
export const isAddRoleFromDashboard = (phasesAdditionAllowed?: Array<string>) =>
  !!phasesAdditionAllowed && phasesAdditionAllowed[0].startsWith('dashboard');

export const isAddRoleFromDashboardAsync = (phasesAdditionAllowed?: Array<string>) =>
  !!phasesAdditionAllowed && phasesAdditionAllowed[0] === 'dashboard-async';

export const EA_RADIO_OPTIONS = [
  {
    value: true,
    titleKey: 'userEdit.addForm.addOnAggregatedEntities.radioTitle1',
    descriptionKey: 'userEdit.addForm.addOnAggregatedEntities.radioDescription1',
  },
  {
    value: false,
    titleKey: 'userEdit.addForm.addOnAggregatedEntities.radioTitle2',
    descriptionKey: 'userEdit.addForm.addOnAggregatedEntities.radioDescription2',
  },
];

export const buildFormValues = (
  userRegistry: UserRegistry | null,
  currentValues: any,
  initialFormData: any
) => ({
  ...currentValues,
  name:
    userRegistry?.name ?? (currentValues.certifiedName ? initialFormData.name : currentValues.name),
  surname:
    userRegistry?.surname ??
    (currentValues.certifiedSurname ? initialFormData.surname : currentValues.surname),
  email:
    userRegistry?.email ??
    (currentValues.certifiedName || currentValues.certifiedSurname
      ? initialFormData.email
      : currentValues.email),
  confirmEmail: '',
  certifiedName:
    userRegistry?.certifiedName ??
    (currentValues.certifiedName ? initialFormData.certifiedName : currentValues.certifiedName),
  certifiedSurname:
    userRegistry?.certifiedSurname ??
    (currentValues.certifiedSurname
      ? initialFormData.certifiedSurname
      : currentValues.certifiedSurname),
});

/*
// Role management utilities
export const calculateNextProductRoles = (
  role: ProductRole,
  currentRoles: Array<string>,
  productRoles: ProductRolesLists | undefined
) => {
  if (role.multiroleAllowed && currentRoles.length > 0) {
    if (productRoles?.groupByProductRole[currentRoles[0]].selcRole !== role.selcRole) {
      return [role.productRole];
    } else {
      const productRoleIndex = currentRoles.findIndex((p) => p === role.productRole);
      if (productRoleIndex === -1) {
        return currentRoles.concat([role.productRole]);
      } else {
        return currentRoles.filter((_p, i) => i !== productRoleIndex);
      }
    }
  } else {
    return [role.productRole];
  }
};
*/
