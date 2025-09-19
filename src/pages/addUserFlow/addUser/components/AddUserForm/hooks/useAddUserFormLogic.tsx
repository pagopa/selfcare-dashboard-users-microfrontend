import { useState } from 'react';
import { Party } from '../../../../../../model/Party';
import { PartyUserOnCreation } from '../../../../../../model/PartyUser';
import { Product } from '../../../../../../model/Product';
import { validateUserForm } from '../utils/addUserFormUtils';

export const useAddUserFormComputedValues = (party: Party, products: Array<Product>) => {
  const isPnpgTheOnlyProduct =
    !!products.find((p) => p.id === 'prod-pn-pg') && products.length === 1;
  const pnpgProduct = products.find((p) => p.id === 'prod-pn-pg');

  const activeOnboardings = party.products.filter((p) => p.productOnBoardingStatus === 'ACTIVE');

  const isAdminEaOnProdIO = party.products.some(
    (p) => p.productOnBoardingStatus === 'ACTIVE' && p.productId === 'prod-io' && p.isAggregator
  );

  return {
    isPnpgTheOnlyProduct,
    pnpgProduct,
    activeOnboardings,
    isAdminEaOnProdIO,
  };
};

// Custom hook for form validation
export const useFormValidation = (t: any) => {
  const [validTaxcode, setValidTaxcode] = useState<string>();

  const validate = (values: Partial<PartyUserOnCreation>) => {
    const errors = validateUserForm(values, t);

    if (!errors.taxCode) {
      setValidTaxcode(values.taxCode);
    } else {
      setValidTaxcode(undefined);
    }

    return errors;
  };

  return { validate, validTaxcode, setValidTaxcode };
};
