import { Grid } from '@mui/material';
import { Product } from '../../../../model/Product';
import { ProductRole, ProductsRolesMap } from '../../../../model/ProductRole';
import { ProductRolesGroupByTitle } from '../../UsersPage/UsersPage';
import UsersTableRolesFilter from './UsersTableRolesFilter';

export type UsersTableFiltersConfig = {
  /** If the roles configuration imply a set of products, this will be considered as filter */
  productIds: Array<string>;
  /** The product roles selected as filter */
  productRoles: Array<ProductRole>;
};
interface UsersSearchFilterProps {
  products: Array<Product>;
  disableFilters: boolean;
  filters: UsersTableFiltersConfig;
  productsRolesMap: ProductsRolesMap;
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

export default function UsersTableFilters({
  filters,
  productsRolesMap,
  showSelcRoleGrouped,
  setProductRoleCheckedBySelcRole,
  productRoleCheckedBySelcRole,
  productFiltered,
  productList,
}: UsersSearchFilterProps) {
  const productRolesList: Array<ProductRole> = Object.values(productsRolesMap).flatMap(
    (p) => p.list
  );

  return (
    <Grid container direction="row" alignItems={'center'} columnSpacing={2}>
      <UsersTableRolesFilter
        productRolesSelected={filters.productRoles}
        productRolesList={productRolesList}
        showSelcRoleGrouped={showSelcRoleGrouped}
        setProductRoleCheckedBySelcRole={setProductRoleCheckedBySelcRole}
        productRoleCheckedBySelcRole={productRoleCheckedBySelcRole}
        productFiltered={productFiltered}
        productList={productList}
      />
    </Grid>
  );
}
