import useLoading from '@pagopa/selfcare-common-frontend/lib/hooks/useLoading';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { userSelectors } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { PartyUserDetail } from '../model/PartyUser';
import { ProductsMap } from '../model/Product';
import { useAppSelector } from '../redux/hooks';
import { fetchPartyUser } from '../services/usersService';
import { LOADING_TASK_FETCH_PARTY_USER } from '../utils/constants';

export const useUserDetail = (): ((
  partyId: string,
  userId: string,
  productsMap: ProductsMap
) => Promise<PartyUserDetail | null>) => {
  const setLoading = useLoading(LOADING_TASK_FETCH_PARTY_USER);
  const currentUser = useAppSelector(userSelectors.selectLoggedUser) as User;

  return (
    partyId: string,
    userId: string,
    productsMap: ProductsMap
  ): Promise<PartyUserDetail | null> => {
    setLoading(true);
    return fetchPartyUser(partyId, userId, currentUser, productsMap).finally(() =>
      setLoading(false)
    );
  };
};
