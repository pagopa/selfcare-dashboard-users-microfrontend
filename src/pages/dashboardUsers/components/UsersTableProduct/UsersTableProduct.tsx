import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { handleErrors } from '@pagopa/selfcare-common-frontend/services/errorService';
import { userSelectors } from '@pagopa/selfcare-common-frontend/redux/slices/userSlice';
import { useEffect, useState } from 'react';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import useFakePagination from '@pagopa/selfcare-common-frontend/hooks/useFakePagination';
import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { Party, UserStatus } from '../../../../model/Party';
import { PartyProductUser } from '../../../../model/PartyUser';
import { Product, ProductsMap } from '../../../../model/Product';
import { useAppSelector } from '../../../../redux/hooks';
import { fetchPartyProductUsers } from '../../../../services/usersService';
import { UsersTableFiltersConfig } from '../UsersTableActions/UsersTableFilters';
import { ProductRolesLists } from '../../../../model/ProductRole';
import UsersProductTable from './components/UsersProductTable';
import UserProductFetchError from './components/UserProductFetchError';

type Props = {
  incrementalLoad: boolean;
  initialPageSize: number;
  party: Party;
  product: Product;
  productsMap: ProductsMap;
  onFetchStatusUpdate: (isFetching: boolean, count?: number) => void;
  userDetailUrl: string;
  filterConfiguration: UsersTableFiltersConfig;
  hideProductWhenLoading: boolean;
  productRolesLists: ProductRolesLists;
};

const UsersTableProduct = ({
  incrementalLoad,
  initialPageSize,
  party,
  product,
  productsMap,
  productRolesLists,
  onFetchStatusUpdate,
  filterConfiguration,
  hideProductWhenLoading,
  userDetailUrl,
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

  const fakePagedFetch = useFakePagination(() =>
    fetchPartyProductUsers(
      { page: 0, size: 2000 }, // pageRequest?.page as PageRequest, TODO actually pagination is not supported
      party,
      product,
      currentUser ?? ({ uid: 'NONE' } as User),
      productsMap,
      undefined,
      filterConfiguration.productRoles
    ).then((data) => data.content)
  );

  const canEdit = product.userRole === 'ADMIN' && product.status === 'ACTIVE';

  useEffect(() => {
    if (
      filterConfiguration.productIds.length > 0 &&
      filterConfiguration.productIds.indexOf(product.id) === -1
    ) {
      onFetchStatusUpdate(false, 0);
      setUsers({ content: [], page: { number: 0, size: 0, totalElements: 0, totalPages: 0 } });
      setNoMoreData(true);
    } else {
      const requestPage = incrementalLoad ? 0 : pageRequest?.page?.page ?? 0;
      const requestPageSize = pageRequest?.page?.size ?? initialPageSize;
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
  }, [filterConfiguration, product]);

  useEffect(() => {
    if (pageRequest) {
      fetchUsers();
    }
  }, [pageRequest]);

  const fetchUsers = () => {
    onFetchStatusUpdate(true, users.content.length);
    setLoading(true);
    fakePagedFetch(pageRequest?.page as PageRequest, pageRequest?.filterChanged as boolean)
      .then((r) => {
        const nextUsers =
          pageRequest?.page.page === 0 || !incrementalLoad
            ? r
            : { content: users.content.concat(r.content), page: r.page };
        setUsers(nextUsers);
        setNoMoreData(r.content.length < (pageRequest?.page as PageRequest).size);
        onFetchStatusUpdate(false, nextUsers.content.length);
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
        onFetchStatusUpdate(false, 1);
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

  if (error) {
    return <UserProductFetchError onRetry={fetchUsers} />;
  } else {
    return (loading && hideProductWhenLoading && users.content.length === 0) ||
      (!loading && users.content.length === 0) ? (
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
        canEdit={canEdit}
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
