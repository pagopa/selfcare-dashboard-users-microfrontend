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
  setOpenDialogMobile: React.Dispatch<React.SetStateAction<boolean>>;
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
  setOpenDialogMobile,
}: UsersSearchProps) {
  return (
    <UsersTableFilters
      selectedProduct={selectedProduct}
      disableFilters={disableFilters}
      filters={filters}
      onFiltersChange={onFiltersChange}
      products={products}
      productsRolesMap={productsRolesMap}
      showSelcRoleGrouped={showSelcRoleGrouped}
      loading={loading}
      setOpenDialogMobile={setOpenDialogMobile}
    />
  );
}
