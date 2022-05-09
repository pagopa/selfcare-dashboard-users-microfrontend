import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import { ProductsMap } from '../model/Product';
import { UserRegistry } from '../model/UserRegistry';
import { fetchUserRegistryById } from '../services/usersService';
import { LOADING_TASK_FETCH_PARTY_USER } from '../utils/constants';

export const useUserRegistry = (): ((
  institutionId: string,
  userId: string,
  productsMap: ProductsMap
) => Promise<UserRegistry | null>) => {
  const setLoading = useLoading(LOADING_TASK_FETCH_PARTY_USER);

  return (institutionId: string, userId: string): Promise<UserRegistry | null> => {
    setLoading(true);
    return fetchUserRegistryById(institutionId, userId).finally(() => setLoading(false));
  };
};
