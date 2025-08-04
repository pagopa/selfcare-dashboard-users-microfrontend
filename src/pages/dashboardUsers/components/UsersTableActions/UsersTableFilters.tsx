import { Product } from '../../../../model/Product';
import { ProductRole, ProductsRolesMap } from '../../../../model/ProductRole';
import UsersTableRolesFilter from './UsersTableRolesFilter';

export type UsersTableFiltersConfig = {
  /** If the roles configuration imply a set of products, this will be considered as filter */
  productIds: Array<string>;
  /** The product roles selected as filter */
  productRoles: Array<ProductRole>;
};
interface UsersSearchFilterProps {
  products: Array<Product>;
  selectedProduct?: Product;
  disableFilters: boolean;
  filters: UsersTableFiltersConfig;
  onFiltersChange: (f: UsersTableFiltersConfig) => void;
  productsRolesMap: ProductsRolesMap;
  showSelcRoleGrouped: boolean;
  loading: boolean;
  setOpenDialogMobile: React.Dispatch<React.SetStateAction<boolean>>;
  searchByName: string;
  setSearchByName: React.Dispatch<React.SetStateAction<string>>;
  disableRemoveFiltersButton: boolean;
  setDisableRemoveFiltersButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UsersTableFilters({
  filters,
  onFiltersChange,
  productsRolesMap,
  disableFilters,
  showSelcRoleGrouped,
  loading,
  setOpenDialogMobile,
  searchByName,
  setSearchByName,
  disableRemoveFiltersButton,
  setDisableRemoveFiltersButton,
}: Readonly<UsersSearchFilterProps>) {
  const productRolesList: Array<ProductRole> = Object.values(productsRolesMap).flatMap(
    (p) => p.list
  );

  return (
    <UsersTableRolesFilter
      disableFilters={disableFilters}
      productRolesSelected={filters.productRoles}
      productRolesList={productRolesList}
      onFiltersChange={onFiltersChange}
      filters={filters}
      showSelcRoleGrouped={showSelcRoleGrouped}
      loading={loading}
      setOpenDialogMobile={setOpenDialogMobile}
      searchByName={searchByName}
      setSearchByName={setSearchByName}
      disableRemoveFiltersButton={disableRemoveFiltersButton}
      setDisableRemoveFiltersButton={setDisableRemoveFiltersButton}
    />
  );
}
