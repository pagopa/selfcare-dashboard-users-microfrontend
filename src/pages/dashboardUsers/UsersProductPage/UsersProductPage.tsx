import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { Redirect } from 'react-router-dom';
import { Party } from '../../../model/Party';
import { Product } from '../../../model/Product';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';

type Props = {
  selectedProduct: Product;
  party: Party;
};

function UsersProductPage({ selectedProduct, party }: Props) {
  return (
    <Redirect
      to={resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.MAIN.path, {
        partyId: party.partyId,
      }).concat('#' + `${selectedProduct.id}`)}
    />
  );
}

export default UsersProductPage;
