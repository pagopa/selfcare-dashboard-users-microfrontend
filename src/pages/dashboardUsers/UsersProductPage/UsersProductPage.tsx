import { Button, Grid, Typography } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import React, { useEffect, useState, useMemo } from 'react';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import { Box } from '@mui/system';
import { isEqual } from 'lodash';
import { ButtonNaked } from '@pagopa/mui-italia';
import ProductNavigationBar from '../../../components/ProductNavigationBar';
import UsersTableProduct from '../components/UsersTableProduct/UsersTableProduct';
import UsersTableActions from '../components/UsersTableActions/UsersTableActions';
import { UsersTableFiltersConfig } from '../components/UsersTableActions/UsersTableFilters';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import UserTableNoData from '../components/UserTableNoData';
import { ENV } from '../../../utils/env';
import { Party, UserRole } from '../../../model/Party';
import { Product, ProductsMap } from '../../../model/Product';
import {
  ProductRole,
  productRolesGroupBySelcRole,
  ProductRolesLists,
} from '../../../model/ProductRole';
import { ProductRolesGroupByTitle } from '../UsersPage/UsersPage';

type Props = {
  party: Party;
  productsMap: ProductsMap;
  activeProducts: Array<Product>;
  selectedProduct: Product;
  productRolesList: ProductRolesLists;
};

const emptyFilters: UsersTableFiltersConfig = {
  productIds: [],
  productRoles: [],
};

function UsersProductPage({
  party,
  activeProducts,
  productsMap,
  selectedProduct,
  productRolesList,
}: Props) {
  const showSelcRoleGrouped = false;
  const { t } = useTranslation();

  const paths = [
    {
      description: t('usersPage.vertical.paths.description'),
    },
  ];

  const [filters, setFilters] = useState<UsersTableFiltersConfig>(emptyFilters);
  const [fetchStatus, setFetchStatus] = useState({ loading: true, noData: false });

  const history = useHistory();
  const onExit = useUnloadEventOnExit();
  const addUserUrl = resolvePathVariables(
    DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.ADD_PARTY_PRODUCT_USER.path,
    { partyId: party.partyId, productId: selectedProduct.id }
  );

  const emptySelcRoleGroup = { ADMIN: {}, LIMITED: {} };
  const [productRoleCheckedBySelcRole, setProductRoleCheckedBySelcRole] = React.useState<{
    [selcRole in UserRole]: ProductRolesGroupByTitle;
  }>(emptySelcRoleGroup);

  const nextProductRolesFilter = useMemo(
    () =>
      Object.values(productRoleCheckedBySelcRole)
        .flatMap((groupByTitle) => Object.values(groupByTitle))
        .flatMap((x) => x),
    [productRoleCheckedBySelcRole]
  );
  const productRolesGroupByTitle = (roles: Array<ProductRole>): ProductRolesGroupByTitle =>
    roles.reduce((acc, r) => {
      // eslint-disable-next-line functional/immutable-data
      acc[r.title] = (acc[r.title] ?? []).concat([r]);
      return acc;
    }, {} as ProductRolesGroupByTitle);
  const productList = (
    productRoles: Array<ProductRole>
  ): {
    [selcRole in UserRole]: ProductRolesGroupByTitle;
  } =>
    Object.fromEntries(
      Object.entries(productRolesGroupBySelcRole(productRoles)).map(([selcRole, roles]) => [
        selcRole,
        productRolesGroupByTitle(roles),
      ])
    ) as {
      [selcRole in UserRole]: ProductRolesGroupByTitle;
    };
  const productFiltered = useMemo(() => productList(filters.productRoles), [filters.productRoles]);

  useEffect(() => {
    if (party.userRole !== 'ADMIN') {
      history.push(resolvePathVariables(ENV.ROUTES.OVERVIEW, { partyId: party.partyId }));
    }
  }, [party.partyId]);

  useEffect(() => {
    trackEvent('USER_LIST', { party_id: party.partyId, product: selectedProduct.id });
  }, [selectedProduct]);

  return productRolesList ? (
    <Grid
      container
      px={2}
      mt={10}
      sx={{ backgroundColor: 'transparent !important' }}
      alignSelf="flex-start"
    >
      <Grid item xs={12} mb={3}>
        <ProductNavigationBar selectedProduct={selectedProduct} paths={paths} />
      </Grid>
      <Grid item xs={9} px={2}>
        <TitleBox
          variantTitle="h4"
          variantSubTitle="body1"
          title={t('usersPage.title')}
          subTitle={t('usersPage.vertical.subTitle')}
        />
      </Grid>
      <Grid item xs={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button
          variant="contained"
          sx={{ height: '40px', width: '163px' }}
          onClick={() => onExit(() => history.push(addUserUrl))}
        >
          {t('usersTable.addButton')}
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ height: '100%' }} mt={5}>
        <Grid container direction="row" alignItems={'center'}>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Box>
              <UsersTableActions
                disableFilters={fetchStatus.loading}
                loading={fetchStatus.loading}
                party={party}
                products={activeProducts}
                productsRolesMap={{ [selectedProduct.id]: productRolesList }}
                filters={filters}
                showSelcRoleGrouped={showSelcRoleGrouped}
                setProductRoleCheckedBySelcRole={setProductRoleCheckedBySelcRole}
                productRoleCheckedBySelcRole={productRoleCheckedBySelcRole}
                productFiltered={productFiltered}
                productList={productList}
              />
            </Box>
            <Box display="flex" alignItems="flex-end" justifyContent="center">
              <Button
                disabled={isEqual(filters.productRoles, nextProductRolesFilter)}
                sx={{ height: '40px' }}
                color="primary"
                variant="outlined"
                type="submit"
                onClick={() =>
                  setFilters({
                    productIds: nextProductRolesFilter.map((f) => f.productId),
                    productRoles: nextProductRolesFilter,
                  })
                }
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 'fontWeightBold',
                    color: nextProductRolesFilter.length === 0 ? 'text.disabled' : 'primary.main',
                  }}
                >
                  {t('usersTable.filterRole.addFiltersButton')}
                </Typography>
              </Button>
            </Box>
            <Box ml={3} display="flex" alignItems="center" justifyContent="center">
              <ButtonNaked
                component="button"
                disabled={nextProductRolesFilter.length === 0}
                sx={{ color: 'primary.main' }}
                onClick={() => {
                  setFilters(emptyFilters);
                  setProductRoleCheckedBySelcRole(productFiltered);
                }}
              >
                {t('usersTable.filterRole.deleteFiltersButton')}
              </ButtonNaked>
            </Box>
          </Grid>
          <Grid item xs={12} mt={5}>
            <UsersTableProduct
              hideProductWhenLoading={true}
              incrementalLoad={false}
              initialPageSize={ENV.PARTY_PRODUCT_USERS_PAGE_SIZE}
              party={party}
              product={selectedProduct}
              productsMap={productsMap}
              productRolesLists={productRolesList}
              filterConfiguration={filters}
              onFetchStatusUpdate={(isFetching, count) => {
                setFetchStatus({ loading: isFetching, noData: !count || count === 0 });
              }}
              userDetailUrl={resolvePathVariables(
                DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.PARTY_PRODUCT_USER_DETAIL.path,
                {
                  partyId: party.partyId,
                  productId: selectedProduct.id,
                }
              )}
            />
          </Grid>
          {!fetchStatus.loading && fetchStatus.noData && (
            <UserTableNoData removeFilters={() => setFilters(emptyFilters)} />
          )}
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}

export default UsersProductPage;
