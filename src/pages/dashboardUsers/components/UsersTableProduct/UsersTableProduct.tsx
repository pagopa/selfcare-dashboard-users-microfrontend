import { PageRequest } from '@pagopa/selfcare-common-frontend/lib/model/PageRequest';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { handleErrors } from '@pagopa/selfcare-common-frontend/lib/services/errorService';
import { userSelectors } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PageResource } from '@pagopa/selfcare-common-frontend/lib/model/PageResource';
import useFakePagination from '@pagopa/selfcare-common-frontend/lib/hooks/useFakePagination';
import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { Party, UserStatus } from '../../../../model/Party';
import { PartyProductUser } from '../../../../model/PartyUser';
import { Product, ProductsMap } from '../../../../model/Product';
import { useAppSelector } from '../../../../redux/hooks';
import { fetchPartyProductUsers } from '../../../../services/usersService';
import { UsersTableFiltersConfig } from '../UsersTableActions/UsersTableFilters';
import { ProductRolesLists } from '../../../../model/ProductRole';
import { sortedUsers } from '../../../../utils/utils';
import UsersProductTable from './components/UsersProductTable';
import UserProductFetchError from './components/UserProductFetchError';

type Props = {
  incrementalLoad: boolean;
  initialPageSize: number;
  party: Party;
  product: Product;
  selected: boolean;
  productsMap: ProductsMap;
  onFetchStatusUpdate: (isFetching: boolean, count: number, error: boolean) => void;
  userDetailUrl: string;
  filterConfiguration: UsersTableFiltersConfig;
  productRolesLists: ProductRolesLists;
  searchByName: string;
};

const UsersTableProduct = ({
  incrementalLoad,
  initialPageSize,
  party,
  selected,
  product,
  productsMap,
  productRolesLists,
  onFetchStatusUpdate,
  filterConfiguration,
  userDetailUrl,
  searchByName,
}: Props) => {
  const currentUser = useAppSelector(userSelectors.selectLoggedUser);

  const history = useHistory();

  const [users, setUsers] = useState<PageResource<PartyProductUser>>({
    content: [],
    page: { number: 0, size: 0, totalElements: 0, totalPages: 0 },
  });
  const [noMoreData, setNoMoreData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageRequest, setPageRequest] = useState<{ page: PageRequest; filterChanged: boolean }>();

  const filterUsers = useMemo(
    () => (users: Array<PartyProductUser>) =>
      users.filter((user) =>
        `${user.name} ${user.surname}`.toLowerCase().includes(searchByName.toLowerCase())
      ),
    [searchByName]
  );

  const fakePagedFetch = useFakePagination(() =>
    fetchPartyProductUsers(
      { page: 0, size: 2000 }, // pageRequest?.page as PageRequest, TODO actually pagination is not supported
      party,
      product,
      currentUser ?? ({ uid: 'NONE' } as User),
      productsMap,
      undefined,
      filterConfiguration.productRoles.filter((r) => r.productId === product.id)
    ).then((data) => {
      if (searchByName) {
        return sortedUsers(filterUsers(data.content));
      }

      return sortedUsers(data.content);
    })
  );

  const previousInitialPageSize = useRef(initialPageSize);

  useEffect(() => {
    if (
      filterConfiguration.productIds.length > 0 &&
      filterConfiguration.productIds.indexOf(product.id) === -1
    ) {
      onFetchStatusUpdate(false, 0, false);
      setUsers({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } });
      setNoMoreData(true);
    } else {
      const requestPage = incrementalLoad ? 0 : selected ? 0 : pageRequest?.page?.page ?? 0;
      const requestPageSize =
        previousInitialPageSize.current !== initialPageSize
          ? initialPageSize
          : pageRequest?.page?.size ?? initialPageSize;
      // eslint-disable-next-line functional/immutable-data
      previousInitialPageSize.current = initialPageSize;
      setUsers({
        content: [],
        page: { number: requestPage, size: requestPageSize, totalElements: 0, totalPages: 0 },
      });
      setPageRequest({
        filterChanged: true,
        page: {
          page: requestPage,
          size: requestPageSize,
        },
      });
    }
  }, [filterConfiguration, product, initialPageSize]);

  useEffect(() => {
    if (pageRequest) {
      fetchUsers();
    }
  }, [pageRequest]);

  useEffect(() => {
    if (filterConfiguration) {
      setError(false);
    }
  }, [filterConfiguration]);

  const fetchUsers = () => {
    onFetchStatusUpdate(true, users.content.length, error);
    setLoading(true);
    fakePagedFetch(pageRequest?.page as PageRequest, pageRequest?.filterChanged as boolean)
      .then((r) => {
        const nextUsers =
          pageRequest?.page.page === 0 || !incrementalLoad
            ? r
            : { content: users.content.concat(r.content), page: r.page };

        setUsers(nextUsers);
        if (product.id === 'prod-pagopa') {
          const count = nextUsers.content.filter((user) =>
            user.product.roles.some(
              // @ts-expect-error ADMIN_EA is not supported in the filter by role at the moment
              (roleInfo) => roleInfo.selcRole === 'ADMIN' || roleInfo.selcRole === 'ADMIN_EA'
            )
          ).length;
          sessionStorage.setItem('adminMaxLimit', count.toString());
        }
        setError(false);
        setNoMoreData(r.content.length < (pageRequest?.page as PageRequest).size);
        onFetchStatusUpdate(false, nextUsers.content.length, false);
      })
      .catch((reason) => {
        handleErrors([
          {
            id: 'FETCH_PARTY_USERS',
            blocking: false,
            error: reason,
            techDescription: `An error occurred while fetching party users ${party.partyId} of product ${product} and filter ${filterConfiguration}`,
            toNotify: true,
          },
        ]);
        setError(true);
        setUsers({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } });
        onFetchStatusUpdate(false, 1, true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDelete = (partyUser: PartyProductUser) => {
    if (incrementalLoad) {
      setUsers({ ...users, content: users.content.filter((u) => u.id !== partyUser.id) });
    } else {
      setPageRequest({
        filterChanged: true,
        page: pageRequest?.page as PageRequest,
      });
    }
  };

  const onStatusUpdate = (partyUser: PartyProductUser, nextStatus: UserStatus) => {
    // eslint-disable-next-line functional/immutable-data
    partyUser.status = nextStatus;
    // eslint-disable-next-line functional/immutable-data
    partyUser.product.roles[0].status = nextStatus;
    setUsers({ page: users.page, content: users.content.slice() });
  };

  if (error && !loading) {
    return <UserProductFetchError onRetry={fetchUsers} />;
  } else {
    return !loading && users.content.length === 0 ? (
      <></>
    ) : (
      <UsersProductTable
        loading={loading}
        incrementalLoad={incrementalLoad}
        noMoreData={noMoreData}
        party={party}
        product={product}
        productRolesLists={productRolesLists}
        users={users.content}
        page={users.page}
        sort={pageRequest?.page.sort}
        fetchPage={(page, size, refetch = false) =>
          setPageRequest({
            filterChanged: refetch,
            page: {
              page: incrementalLoad ? (pageRequest?.page as PageRequest).page + 1 : page ?? 0,
              size: incrementalLoad
                ? (pageRequest?.page as PageRequest).size
                : size ?? (pageRequest?.page as PageRequest).size,
              sort: (pageRequest?.page as PageRequest).sort,
            },
          })
        }
        onSortRequest={(sort) =>
          setPageRequest({
            filterChanged: false,
            page: {
              page: incrementalLoad ? 0 : (pageRequest?.page as PageRequest).page,
              size: (pageRequest?.page as PageRequest).size,
              sort,
            },
          })
        }
        onRowClick={(partyUser) =>
          history.push(resolvePathVariables(userDetailUrl, { userId: partyUser.id }))
        }
        onDelete={onDelete}
        onStatusUpdate={onStatusUpdate}
      />
    );
  }
};

export default UsersTableProduct;
