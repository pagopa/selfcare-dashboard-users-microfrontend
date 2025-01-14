import { Grid, Typography } from '@mui/material';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useState } from 'react';
import { Party } from '../../../model/Party';
import { Product, ProductsMap } from '../../../model/Product';
import { ProductsRolesMap } from '../../../model/ProductRole';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import { ENV } from '../../../utils/env';
import { UsersTableFiltersConfig } from './UsersTableActions/UsersTableFilters';
import UsersTableProduct from './UsersTableProduct/UsersTableProduct';

type Props = {
  hideProductWhenLoading: boolean;
  party: Party;
  product: Product;
  selected: boolean;
  productsMap: ProductsMap;
  onFetchStatusUpdate: (loading: boolean, noData: boolean, error: boolean) => void;
  filters: UsersTableFiltersConfig;
  productsRolesMap: ProductsRolesMap;
  incrementalLoad: boolean;
  isPnpgTheOnlyProduct?: boolean;
  searchByName: string;
};

export default function UsersProductSection({
  party,
  product,
  productsMap,
  selected,
  productsRolesMap,
  hideProductWhenLoading,
  onFetchStatusUpdate,
  filters,
  incrementalLoad,
  isPnpgTheOnlyProduct,
  searchByName,
}: Readonly <Props>) {
  const [fetchStatus, setFetchStatus] = useState({ loading: true, noData: false, error: false });

  return (
    <Grid container direction="row">
      {((!hideProductWhenLoading && fetchStatus.loading) ||
        fetchStatus.error ||
        !fetchStatus.noData) &&
      !isPnpgTheOnlyProduct ? (
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Typography sx={{ fontWeight: 'fontWeightMedium' }} id={product.id}>
            {product.title}
          </Typography>
        </Grid>
      ) : (
        <></>
      )}
      <Grid item xs={12}>
        <UsersTableProduct
          incrementalLoad={incrementalLoad}
          hideProductWhenLoading={hideProductWhenLoading}
          initialPageSize={
            incrementalLoad ? ENV.PARTY_USERS_PAGE_SIZE : ENV.PARTY_PRODUCT_USERS_PAGE_SIZE
          }
          party={party}
          selected={selected}
          product={product}
          productsMap={productsMap}
          productRolesLists={productsRolesMap[product.id]}
          filterConfiguration={filters}
          onFetchStatusUpdate={(isFetching, count, error) => {
            const noData = !count || count === 0;
            setFetchStatus({ loading: isFetching, noData, error });
            onFetchStatusUpdate(isFetching, noData, error);
          }}
          userDetailUrl={resolvePathVariables(
            DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path,
            {
              partyId: party.partyId,
            }
          )}
          searchByName={searchByName}
        />
      </Grid>
    </Grid>
  );
}
