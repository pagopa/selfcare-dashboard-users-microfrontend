import { UserRole } from "@pagopa/selfcare-common-frontend/lib/utils/constants";
import { ProductRole, productRolesGroupBySelcRole } from "../../../../model/ProductRole";

export type ProductRolesGroupByTitle = { [title: string]: Array<ProductRole> };

const productRolesGroupByTitle = (roles: Array<ProductRole>): ProductRolesGroupByTitle =>
  roles.reduce((acc, r) => {
    // eslint-disable-next-line functional/immutable-data
    acc[r.title] = (acc[r.title] ?? []).concat([r]);
    return acc;
  }, {} as ProductRolesGroupByTitle);

export const emptySelcRoleGroup = { ADMIN: {}, LIMITED: {} };

export const labels = {
  ADMIN: {
    titleKey: 'usersTable.filterRole.admin.title',
    descriptionKey: 'usersTable.filterRole.admin.description',
  },
  LIMITED: {
    titleKey: 'usersTable.filterRole.limited.title',
    descriptionKey: 'usersTable.filterRole.limited.description',
  },
};

export const productList = (
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

    