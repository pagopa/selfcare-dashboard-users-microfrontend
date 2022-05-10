import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import { UserRegistry } from '../model/UserRegistry';
import { fetchUserRegistryById } from '../services/usersService';
import { LOADING_TASK_FETCH_USER_REGISTRY } from '../utils/constants';

export const useUserRegistry = (): ((
  institutionId: string,
  userId: string
) => Promise<UserRegistry | null>) => {
  const setLoading = useLoading(LOADING_TASK_FETCH_USER_REGISTRY);

  return (institutionId: string, userId: string): Promise<UserRegistry | null> => {
    setLoading(true);
    return fetchUserRegistryById(institutionId, userId).finally(() => setLoading(false));
  };
};
