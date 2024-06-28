import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { Redirect } from 'react-router-dom';
import { Party } from '../../model/Party';
import { DASHBOARD_USERS_ROUTES } from '../../routes';

type Props = {
  party: Party;
};

function AddUsersProductPage({ party }: Props) {
  return (
    <Redirect
      to={resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.ADD_PARTY_USER.path, {
        partyId: party.partyId,
      })}
    />
  );
}

export default AddUsersProductPage;
