import { Select } from '@mui/material';
import { styled } from '@mui/system';
import { UserRole } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { PartyRole } from '../../../../model/Party';
import {
  ProductRole,
  productRoles2ProductRolesList,
  productRolesGroupBySelcRole,
} from '../../../../model/ProductRole';

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

export const partyRoleList = (productRoles: Array<ProductRole>): Array<PartyRole> => {
  const rolesList = productRoles2ProductRolesList(productRoles);
  return Object.entries(rolesList.groupByPartyRole)
    .filter(([_role, roles]) => roles.length > 0)
    .map(([role]) => role as PartyRole);
};

export const CustomSelect = styled(Select)({
  '& .MuiInput-root': {
    cursor: 'pointer',
  },
  '& .MuiSelect-select.MuiSelect-outlined': {
    cursor: 'pointer',
  },
});
