import { useState } from 'react';
import { Party } from '../../../../../../model/Party';
import { PartyUserOnCreation } from '../../../../../../model/PartyUser';
import { Product } from '../../../../../../model/Product';
import { PRODUCT_IDS } from '../../../../../../utils/constants';
import { validateUserForm } from '../utils/addUserFormUtils';

export const useAddUserFormComputedValues = (
  party: Party,
  products: Array<Product>,
  userProduct: Product | undefined
) => {
  const isPnpgTheOnlyProduct = !!products.find(
    (p) => p.id === PRODUCT_IDS.PNPG && products.length === 1
  );
  const pnpgProduct = products.find((p) => p.id === PRODUCT_IDS.PNPG);

  const activeOnboardings = party.products.filter((p) => p.productOnBoardingStatus === 'ACTIVE');

  const isAdminEaOnProdIO =
    party.products.some(
      (p) =>
        p.productOnBoardingStatus === 'ACTIVE' && p.productId === PRODUCT_IDS.IO && p.isAggregator
    ) && userProduct?.id === PRODUCT_IDS.IO;

  return {
    isPnpgTheOnlyProduct,
    pnpgProduct,
    activeOnboardings,
    isAdminEaOnProdIO,
  };
};

// Custom hook for form validation
export const useFormValidation = (t: any, isAdminEaOnProdIO: boolean) => {
  const [validTaxcode, setValidTaxcode] = useState<string>();

  const validate = (values: Partial<PartyUserOnCreation>) => {
    const errors = validateUserForm(values, t, isAdminEaOnProdIO);

    if (!errors.taxCode) {
      setValidTaxcode(values.taxCode);
    } else {
      setValidTaxcode(undefined);
    }

    return errors;
  };

  return { validate, validTaxcode, setValidTaxcode };
};
