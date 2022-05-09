import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import { uniqueId } from 'lodash';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useUserRegistry } from '../hooks/useUserRegistry';
import { DASHBOARD_USERS_ROUTES } from '../routes';
import { Party } from '../model/Party';
import { ProductsMap } from '../model/Product';
import { ENV } from '../utils/env';
import { UserRegistry } from '../model/UserRegistry';
import { PartyUserOnEdit } from '../model/PartyUser';

export type withUserRegistryProps = {
  partyUser: PartyUserOnEdit;
  party: Party;
  productsMap: ProductsMap;
};

type UserUrlParams = {
  institutionId: string;
  userId: string;
};

export default function withUserRegistry<T extends withUserRegistryProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<Omit<T, 'partyUser' | 'fetchPartyUser'>> {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentUserRegistry = (props: T) => {
    const { institutionId, userId } = useParams<UserUrlParams>();
    const fetchPartyUser = useUserRegistry();
    const [partyUser, setPartyUser] = useState<UserRegistry | null>();
    const addError = useErrorDispatcher();
    const history = useHistory();

    const doFetch = () => {
      fetchPartyUser(institutionId, userId, props.productsMap)
        .then((user) => {
          if (user === null) {
            const goBackUrl = resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.path, {
              institutionId,
            });

            addError({
              id: 'INVALID_PARTY_USER_ID_' + userId + '__' + institutionId,
              blocking: false,
              techDescription: `Selected an invalid user Id ${userId} and/or institution id ${institutionId}`,
              toNotify: false,
              error: new Error('INVALID_PARTY_USER_ID_INSTITUTION_ID'),
              onClose: () => history.push(goBackUrl),
              displayableDescription: "Impossibile trovare l'utente selezionato",
            });
          }
          setPartyUser(user);
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
      if (props.party.userRole !== 'ADMIN') {
        history.push(resolvePathVariables(ENV.ROUTES.OVERVIEW, { institutionId }));
      } else if (institutionId && userId) {
        doFetch();
      } else {
        throw new Error(
          'Using withUserRegistry decorator under a path without institutionId or userId'
        );
      }
    }, [institutionId, userId]);

    return partyUser ? (
      <WrappedComponent {...props} partyUser={partyUser} fetchPartyUser={doFetch} />
    ) : (
      <></>
    );
  };

  // eslint-disable-next-line functional/immutable-data
  ComponentUserRegistry.displayName = `withUserRegistry(${displayName})`;

  return ComponentUserRegistry as React.ComponentType<Omit<T, 'partyUser' | 'fetchPartyUser'>>;
}
