import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useUserRegistry } from '../hooks/useUserRegistry';
import { Party } from '../model/Party';
import { UserRegistry } from '../model/UserRegistry';
import { DASHBOARD_USERS_ROUTES } from '../routes';
import { ENV } from '../utils/env';

export type withUserRegistryProps = {
  user: UserRegistry;
  party: Party;
};

type UserUrlParams = {
  partyId: string;
  userId: string;
};

export default function withUserRegistry<T extends withUserRegistryProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<Omit<T, 'user' | 'fetchUser'>> {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentUserRegistry = (props: T) => {
    const { partyId, userId } = useParams<UserUrlParams>();
    const fetchUser = useUserRegistry();
    const [user, setUser] = useState<UserRegistry | null>();
    const addError = useErrorDispatcher();
    const history = useHistory();
    const { getAllProductsWithPermission } = usePermissions();
    const canSeeUsers = getAllProductsWithPermission(Actions.ManageProductUsers).length > 0;

    const doFetch = () => {
      fetchUser(partyId, userId)
        .then((fetchedUser) => {
          if (fetchedUser === null) {
            const goBackUrl = resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.path, {
              partyId,
            });

            addError({
              id: 'INVALID_PARTY_USER_ID_' + userId + '__' + partyId,
              blocking: false,
              techDescription: `Selected an invalid user Id ${userId} and/or party id ${partyId}`,
              toNotify: false,
              error: new Error('INVALID_PARTY_USER_ID_PARTY_ID'),
              onClose: () => history.push(goBackUrl),
              displayableDescription: "Impossibile trovare l'utente selezionato",
            });
          }
          setUser(fetchedUser);
        })
        .catch((reason) => {
          addError({
            id: uniqueId(`${ComponentUserRegistry.displayName}-`),
            blocking: false,
            error: reason,
            techDescription: `An error occurred while fetching user detail in component ${ComponentUserRegistry.displayName}`,
            onRetry: doFetch,
            toNotify: true,
          });
        });
    };

    useEffect(() => {
      if (!canSeeUsers) {
        history.push(resolvePathVariables(ENV.ROUTES.OVERVIEW, { partyId }));
      } else if (partyId && userId) {
        doFetch();
      } else {
        throw new Error('Using withUserRegistry decorator under a path without partyId or userId');
      }
    }, [partyId, userId, canSeeUsers]);

    return user ? <WrappedComponent {...props} user={user} fetchUser={doFetch} /> : <></>;
  };

  // eslint-disable-next-line functional/immutable-data
  ComponentUserRegistry.displayName = `withUserRegistry(${displayName})`;

  return ComponentUserRegistry as React.ComponentType<Omit<T, 'user' | 'fetchUser'>>;
}
