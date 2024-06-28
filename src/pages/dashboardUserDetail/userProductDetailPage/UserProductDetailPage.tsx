import { Redirect } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import withUserDetail from '../../../decorators/withUserDetail';
import { PartyUserDetail } from '../../../model/PartyUser';
import { Party } from '../../../model/Party';

type Props = {
  party: Party;
  partyUser: PartyUserDetail;
};

function UserProductDetailPage({ party, partyUser }: Props) {
  return (
    <Redirect
      to={resolvePathVariables(
        DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path,
        { partyId: party.partyId, userId: partyUser.id }
      )}
    />
  );
}

export default withUserDetail(UserProductDetailPage);
