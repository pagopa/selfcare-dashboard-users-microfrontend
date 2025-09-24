import { emailRegexp } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { FormikProps } from 'formik';
import { PartyUserOnCreation } from '../../../../../../model/PartyUser';
import { UserRegistry } from '../../../../../../model/UserRegistry';
import {
  requiredError,
  validateName,
  validateSurname,
  validateTaxCode,
} from '../../../../utils/validation';

const validateEmail = (email: string | undefined, t: (key: string) => string) => {
  if (!email) {
    return requiredError;
  }
  if (!emailRegexp.test(email)) {
    return t('userEdit.addForm.errors.invalidEmail');
  }
  return undefined;
};

const validateConfirmEmail = (
  confirmEmail: string | undefined,
  email: string | undefined,
  t: (key: string) => string
) => {
  if (!confirmEmail) {
    return requiredError;
  }
  if (email && confirmEmail.toLocaleLowerCase() !== email.toLocaleLowerCase()) {
    return t('userEdit.addForm.errors.mismatchEmail');
  }
  return undefined;
};

const validateProductRoles = (productRoles: Array<any> | undefined) =>
  productRoles?.length === 0 ? requiredError : undefined;

const validateToAddOnAggregates = (toAddOnAggregates: any, isAdminEaOnProdIO: boolean) => {
  // Only validate if isAdminEaOnProdIO is true
  if (!isAdminEaOnProdIO) {
    return undefined;
  }

  return toAddOnAggregates === undefined ? requiredError : undefined;
};

export const validateUserForm = (
  values: Partial<PartyUserOnCreation>,
  t: (key: string) => string,
  isAdminEaOnProdIO: boolean
) => {
  const validationResults = {
    name: validateName(values.name, values.taxCode, t),
    surname: validateSurname(values.surname, values.taxCode, t),
    taxCode: validateTaxCode(values.taxCode, t),
    email: validateEmail(values.email, t),
    confirmEmail: validateConfirmEmail(values.confirmEmail, values.email, t),
    productRoles: validateProductRoles(values.productRoles),
    toAddOnAggregates: validateToAddOnAggregates(values.toAddOnAggregates, isAdminEaOnProdIO),
  };

  // Filter out undefined values (no errors)
  return Object.fromEntries(
    Object.entries(validationResults).filter(([_key, value]) => value !== undefined)
  );
};

// Pure utility functions
export const isAddRoleFromDashboard = (phasesAdditionAllowed?: Array<string>) =>
  !!phasesAdditionAllowed && phasesAdditionAllowed[0].startsWith('dashboard');

export const isAddRoleFromDashboardAsync = (phasesAdditionAllowed?: Array<string>) =>
  !!phasesAdditionAllowed && phasesAdditionAllowed[0] === 'dashboard-async';

export const EA_RADIO_OPTIONS = [
  {
    value: false,
    titleKey: 'userEdit.addForm.addOnAggregatedEntities.radioTitle1',
    descriptionKey: 'userEdit.addForm.addOnAggregatedEntities.radioDescription1',
  },
  {
    value: true,
    titleKey: 'userEdit.addForm.addOnAggregatedEntities.radioTitle2',
    descriptionKey: 'userEdit.addForm.addOnAggregatedEntities.radioDescription2',
  },
];

export const buildFormValues = async (
  userRegistry: UserRegistry | null,
  currentValues: PartyUserOnCreation,
  initialFormData: PartyUserOnCreation,
  formik: FormikProps<PartyUserOnCreation>
) => {
  await formik.setValues({
    ...currentValues,
    name:
      userRegistry?.name ??
      (currentValues.certifiedName ? initialFormData.name : currentValues.name),
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
};

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
