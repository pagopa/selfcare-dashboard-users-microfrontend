import useFakePagination from '@pagopa/selfcare-common-frontend/lib/hooks/useFakePagination';
import { PageRequest } from '@pagopa/selfcare-common-frontend/lib/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/lib/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { userSelectors } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { handleErrors } from '@pagopa/selfcare-common-frontend/lib/services/errorService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { isPagoPaUser } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Party } from '../../../../model/Party';
import { AllUserInfo, PartyProductUser } from '../../../../model/PartyUser';
import { Product, ProductsMap } from '../../../../model/Product';
import { ProductRolesLists } from '../../../../model/ProductRole';
import { useAppSelector } from '../../../../redux/hooks';
import { fetchPartyProductUsers, getAllUsersService } from '../../../../services/usersService';
import { sortedUsers } from '../../../../utils/utils';
import { UsersTableFiltersConfig } from '../UsersTableActions/UsersTableFilters';
import UserProductFetchError from './components/UserProductFetchError';
import UsersProductTable from './components/UsersProductTable';

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
  hideProductWhenLoading: boolean;
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

  const [users, setUsers] = useState<PageResource<PartyProductUser | AllUserInfo>>({
    content: [],
    page: { number: 0, size: 0, totalElements: 0, totalPages: 0 },
  });
  const [noMoreData, setNoMoreData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageRequest, setPageRequest] = useState<{ page: PageRequest; filterChanged: boolean }>();

  const filterUsers = useMemo(
    () => (users: Array<PartyProductUser | AllUserInfo>) =>
      users.filter((user) =>
        `${user.name} ${user.surname}`.toLowerCase().includes(searchByName.toLowerCase())
      ),
    [searchByName]
  );

  const fakePagedFetch = useFakePagination(() => {
    const filtersProductRoles = filterConfiguration.productRoles.filter(
      (r) => r.productId === product.id
    );

    if (isPagoPaUser()) {
      return getAllUsersService(
        { page: 0, size: 2000 },
        party,
        product,
        currentUser ?? ({ uid: 'NONE' } as User),
        productsMap,
        undefined,
        filtersProductRoles.length > 0
          ? filtersProductRoles.map((r) => r.productRole).join(',')
          : undefined
      ).then((data) => {
        if (searchByName) {
          return sortedUsers(filterUsers(data.content));
        }

        return sortedUsers(data.content);
      });
    } else {
      return fetchPartyProductUsers(
        { page: 0, size: 2000 },
        party,
        product,
        currentUser ?? ({ uid: 'NONE' } as User),
        productsMap,
        undefined,
        filtersProductRoles
        // eslint-disable-next-line sonarjs/no-identical-functions
      ).then((data) => {
        if (searchByName) {
          return sortedUsers(filterUsers(data.content));
        }

        return sortedUsers(data.content);
      });
    }
  });

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
      />
    );
  }
};

export default UsersTableProduct;
