import React, { useMemo } from 'react';
import { isEqual } from 'lodash';
import { ButtonNaked } from '@pagopa/mui-italia';
import { Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ProductRole,
  productRolesGroupBySelcRole,
  ProductsRolesMap,
} from '../../../model/ProductRole';
import { Party, UserRole } from '../../../model/Party';
import UsersTableActions from '../components/UsersTableActions/UsersTableActions';
import { Product } from '../../../model/Product';
import { UsersTableFiltersConfig } from './UsersTableActions/UsersTableFilters';

export type ProductRolesGroupByTitle = { [title: string]: Array<ProductRole> };
type Props = {
  filters: UsersTableFiltersConfig;
  loading: boolean;
  party: Party;
  productsRolesMap: ProductsRolesMap;
  activeProducts: Array<Product>;
  setFilters: React.Dispatch<React.SetStateAction<UsersTableFiltersConfig>>;
  emptyFilters: UsersTableFiltersConfig;
};

export default function UsersTableActionsContainer({
  filters,
  loading,
  party,
  productsRolesMap,
  activeProducts,
  setFilters,
  emptyFilters,
}: Props) {
  const showSelcRoleGrouped = true;

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
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <UsersTableActions
          disableFilters={loading}
          loading={loading}
          party={party}
          products={activeProducts}
          productsRolesMap={productsRolesMap}
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
          sx={{ color: 'primary.main', height: '40px' }}
          variant="outlined"
          type="submit"
          onClick={() =>
            setFilters({
              productIds: nextProductRolesFilter.map((f) => f.productId),
              productRoles: nextProductRolesFilter,
            })
          }
        >
          {t('usersTable.filterRole.addFiltersButton')}
        </Button>
      </Box>
      <Box ml={3} display="flex" alignItems="center" justifyContent="center">
        <ButtonNaked
          component="button"
          disabled={nextProductRolesFilter.length === 0}
          sx={{ color: 'primary.main' }}
          weight="default"
          onClick={() => {
            setFilters(emptyFilters);
            setProductRoleCheckedBySelcRole(productFiltered);
          }}
        >
          {t('usersTable.filterRole.deleteFiltersButton')}
        </ButtonNaked>
      </Box>
    </>
  );
}
