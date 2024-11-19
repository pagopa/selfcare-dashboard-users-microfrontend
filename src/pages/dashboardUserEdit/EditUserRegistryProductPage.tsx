import { Redirect } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import withUserRegistry, { withUserRegistryProps } from '../../decorators/withUserRegistry';
import { DASHBOARD_USERS_ROUTES } from '../../routes';

function EditUserRegistryProductPage({ party, user }: Readonly<withUserRegistryProps>) {
  return (
    <Redirect
      to={resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.EDIT_USER.path, {
        partyId: party.partyId,
        userId: user.id,
      })}
    />
  );
}

export default withUserRegistry(EditUserRegistryProductPage);
