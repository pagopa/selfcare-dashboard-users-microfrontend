import { Grid, Typography } from '@mui/material';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
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
  productsMap: ProductsMap;
  onFetchStatusUpdate: (loading: boolean, noData: boolean, error: boolean) => void;
  filters: UsersTableFiltersConfig;
  productsRolesMap: ProductsRolesMap;
};

export default function UsersProductSection({
  party,
  product,
  productsMap,
  productsRolesMap,
  hideProductWhenLoading,
  onFetchStatusUpdate,
  filters,
}: Props) {
  const [fetchStatus, setFetchStatus] = useState({ loading: true, noData: false, error: false });

  return (
    <Grid container direction="row">
      {(!hideProductWhenLoading && fetchStatus.loading) ||
      fetchStatus.error ||
      !fetchStatus.noData ? (
        <Grid item xs={12} sx={{ mt: 7 }}>
          <Typography variant="h2" id={product.id}>
            {product.title}
          </Typography>
        </Grid>
      ) : (
        <></>
      )}
      <Grid item xs={12}>
        <UsersTableProduct
          incrementalLoad={true}
          hideProductWhenLoading={hideProductWhenLoading}
          initialPageSize={ENV.PARTY_USERS_PAGE_SIZE}
          party={party}
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
        />
      </Grid>
    </Grid>
  );
}
