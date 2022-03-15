import { UserRole, PartyRole } from './Party';

export type ProductRole = {
  productId: string;
  partyRole: PartyRole;
  selcRole: UserRole;
  multiroleAllowed: boolean;
  productRole: string;
  title: string;
  description: string;
};

export type ProductRolesLists = {
  list: Array<ProductRole>;
  groupByPartyRole: ProductRolesByPartyRoleType;
  groupBySelcRole: ProductRolesBySelcRoleType;
  groupByProductRole: ProductRolesByProductRoleType;
};

export const buildEmptyProductRolesLists = (): ProductRolesLists => ({
  list: [],
  groupBySelcRole: { ADMIN: [], LIMITED: [] },
  groupByProductRole: {},
  groupByPartyRole: { MANAGER: [], DELEGATE: [], SUB_DELEGATE: [], OPERATOR: [] },
});

export type ProductRolesByProductRoleType = { [productRole: string]: ProductRole };
export type ProductRolesBySelcRoleType = { [selcRole in UserRole]: Array<ProductRole> };
export type ProductRolesByPartyRoleType = { [partyRole in PartyRole]: Array<ProductRole> };

export type ProductsRolesMap = {
  [productId: string]: ProductRolesLists;
};

export const productRoles2ProductRolesList = (roles: Array<ProductRole>): ProductRolesLists => ({
  list: roles,
  groupByPartyRole: productRolesGroupByPartyRole(roles),
  groupBySelcRole: productRolesGroupBySelcRole(roles),
  groupByProductRole: productRolesGroupByProductRole(roles),
});

export const productRolesGroupBySelcRole = (
  roles: Array<ProductRole>
): { [selcRole in UserRole]: Array<ProductRole> } =>
  roles.reduce((acc, r) => {
    // eslint-disable-next-line functional/immutable-data
    acc[r.selcRole] = acc[r.selcRole].concat([r]);
    return acc;
  }, buildEmptyProductRolesLists().groupBySelcRole);

const productRolesGroupByPartyRole = (
  roles: Array<ProductRole>
): { [partyRole in PartyRole]: Array<ProductRole> } =>
  roles.reduce((acc, r) => {
    // eslint-disable-next-line functional/immutable-data
    acc[r.partyRole] = acc[r.partyRole].concat([r]);
    return acc;
  }, buildEmptyProductRolesLists().groupByPartyRole);

const productRolesGroupByProductRole = (
  roles: Array<ProductRole>
): { [productRole: string]: ProductRole } =>
  roles.reduce((acc: ProductRolesByProductRoleType, r) => {
    // eslint-disable-next-line functional/immutable-data
    acc[r.productRole] = r;
    return acc;
  }, {});

export const transcodeProductRole2Title = (
  productRole: string,
  productRolesList: ProductRolesLists
) =>
  productRolesList.groupByProductRole[productRole]
    ? productRolesList.groupByProductRole[productRole].title
    : productRole;

export const transcodeProductRole2Description = (
  productRole: string,
  productRolesList: ProductRolesLists
) =>
  productRolesList.groupByProductRole[productRole]
    ? productRolesList.groupByProductRole[productRole].description
    : productRole;
