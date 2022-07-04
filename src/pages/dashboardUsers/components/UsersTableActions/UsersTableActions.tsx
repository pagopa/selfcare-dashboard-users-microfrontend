import { Grid, useTheme } from '@mui/material';
import MDSpinner from 'react-md-spinner';
import { Product } from '../../../../model/Product';
import { Party } from '../../../../model/Party';
import { ProductsRolesMap } from '../../../../model/ProductRole';
import UsersTableFilters, { UsersTableFiltersConfig } from './UsersTableFilters';

interface UsersSearchProps {
  party: Party;
  selectedProduct?: Product;
  products: Array<Product>;
  productsRolesMap: ProductsRolesMap;
  disableFilters: boolean;
  loading: boolean;
  filters: UsersTableFiltersConfig;
  onFiltersChange: (filter: UsersTableFiltersConfig) => void;
  showSelcRoleGrouped: boolean;
}

export default function UsersTableActions({
  selectedProduct,
  products,
  productsRolesMap,
  disableFilters,
  loading,
  filters,
  onFiltersChange,
  showSelcRoleGrouped,
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
          selectedProduct={selectedProduct}
          disableFilters={disableFilters}
          filters={filters}
          onFiltersChange={onFiltersChange}
          products={products}
          productsRolesMap={productsRolesMap}
          showSelcRoleGrouped={showSelcRoleGrouped}
        />
      </Grid>
    </Grid>
  );
}
