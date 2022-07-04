import { Grid, useTheme } from '@mui/material';
import MDSpinner from 'react-md-spinner';
import { Product } from '../../../../model/Product';
import { Party } from '../../../../model/Party';
import { ProductRole, ProductsRolesMap } from '../../../../model/ProductRole';
import { ProductRolesGroupByTitle } from '../../UsersPage/UsersPage';
import UsersTableFilters, { UsersTableFiltersConfig } from './UsersTableFilters';
interface UsersSearchProps {
  party: Party;
  products: Array<Product>;
  productsRolesMap: ProductsRolesMap;
  disableFilters: boolean;
  loading: boolean;
  filters: UsersTableFiltersConfig;
  showSelcRoleGrouped: boolean;
  setProductRoleCheckedBySelcRole: React.Dispatch<
    React.SetStateAction<{
      ADMIN: ProductRolesGroupByTitle;
      LIMITED: ProductRolesGroupByTitle;
    }>
  >;
  productRoleCheckedBySelcRole: {
    ADMIN: ProductRolesGroupByTitle;
    LIMITED: ProductRolesGroupByTitle;
  };
  productFiltered: {
    ADMIN: ProductRolesGroupByTitle;
    LIMITED: ProductRolesGroupByTitle;
  };
  productList: (productRoles: Array<ProductRole>) => {
    ADMIN: ProductRolesGroupByTitle;
    LIMITED: ProductRolesGroupByTitle;
  };
}

export default function UsersTableActions({
  products,
  productsRolesMap,
  disableFilters,
  loading,
  filters,
  showSelcRoleGrouped,
  setProductRoleCheckedBySelcRole,
  productRoleCheckedBySelcRole,
  productFiltered,
  productList,
}: UsersSearchProps) {
  const theme = useTheme();

  return (
    <Grid container direction="row" justifyContent={'flex-end'} alignItems={'center'} px={2}>
      {loading && (
        <Grid item pr={4}>
          <MDSpinner singleColor={theme.palette.primary.main} />
        </Grid>
      )}
      <Grid item>
        <UsersTableFilters
          disableFilters={disableFilters}
          filters={filters}
          products={products}
          productsRolesMap={productsRolesMap}
          showSelcRoleGrouped={showSelcRoleGrouped}
          setProductRoleCheckedBySelcRole={setProductRoleCheckedBySelcRole}
          productRoleCheckedBySelcRole={productRoleCheckedBySelcRole}
          productFiltered={productFiltered}
          productList={productList}
        />
      </Grid>
    </Grid>
  );
}
