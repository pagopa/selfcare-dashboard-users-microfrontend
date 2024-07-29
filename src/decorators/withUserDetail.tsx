import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useUserDetail } from '../hooks/useUserDetail';
import { Party } from '../model/Party';
import { PartyUserDetail } from '../model/PartyUser';
import { ProductsMap } from '../model/Product';
import { DASHBOARD_USERS_ROUTES } from '../routes';
import { ENV } from '../utils/env';

export type withUserDetailProps = {
  partyUser: PartyUserDetail;
  party: Party;
  productsMap: ProductsMap;
};

type UserUrlParams = {
  partyId: string;
  userId: string;
  productId?: string;
};

export default function withUserDetail<T extends withUserDetailProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<Omit<T, 'partyUser' | 'fetchPartyUser'>> {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithUserDetail = (props: T) => {
    const { partyId, userId, productId } = useParams<UserUrlParams>();
    const fetchUserDetail = useUserDetail();
    const [partyUser, setPartyUser] = useState<PartyUserDetail | null>();
    const addError = useErrorDispatcher();
    const history = useHistory();
    const { getAllProductsWithPermission } = usePermissions();
    const canSeeUsers = getAllProductsWithPermission(Actions.ManageProductUsers).length > 0;

    const doFetch = () => {
      fetchUserDetail(partyId, userId, props.productsMap)
        .then((user) => {
          if (user === null) {
            const goBackUrl = productId
              ? resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.path, {
                  partyId,
                  productId,
                })
              : resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.path, {
                  partyId,
                });

            addError({
              id: 'INVALID_PARTY_USER_ID_' + userId + '__' + partyId,
              blocking: false,
              techDescription: `Selected an invalid user Id ${userId} and/or institution id ${partyId}`,
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
            id: uniqueId(`${ComponentWithUserDetail.displayName}-`),
            blocking: false,
            error: reason,
            techDescription: `An error occurred while fetching user detail in component ${ComponentWithUserDetail.displayName}`,
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
        throw new Error('Using withUserDetail decorator under a path without partyId or userId');
      }
    }, [partyId, userId, canSeeUsers]);

    return partyUser ? (
      <WrappedComponent {...props} partyUser={partyUser} fetchPartyUser={doFetch} />
    ) : (
      <></>
    );
  };

  // eslint-disable-next-line functional/immutable-data
  ComponentWithUserDetail.displayName = `withUserDetail(${displayName})`;

  return ComponentWithUserDetail as React.ComponentType<Omit<T, 'partyUser' | 'fetchPartyUser'>>;
}
