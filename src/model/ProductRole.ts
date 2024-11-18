import { PartyRole, UserRoleFilters } from './Party';

export type ProductRole = {
  productId: string;
  partyRole: PartyRole;
  selcRole: UserRoleFilters;
  multiroleAllowed: boolean;
  productRole: string;
  title: string;
  description: string;
  phasesAdditionAllowed: Array<string>;
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
  groupByPartyRole: { MANAGER: [], DELEGATE: [], SUB_DELEGATE: [], OPERATOR: [], ADMIN_EA: [] },
});

export type ProductRolesByProductRoleType = { [productRole: string]: ProductRole };
export type ProductRolesBySelcRoleType = { [selcRole in UserRoleFilters]: Array<ProductRole> };
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
): { [selcRole in UserRoleFilters]: Array<ProductRole> } =>
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

const normalizedProductRole = (productRole: string) =>
  productRole === 'ADMIN' || productRole === 'ADMIN_EA' ? 'admin' : productRole;

export const transcodeProductRole2Title = (
  productRole: string,
  productRolesList: ProductRolesLists
) =>
  productRolesList?.groupByProductRole[normalizedProductRole(productRole)]
    ? productRolesList?.groupByProductRole[normalizedProductRole(productRole)].title
    : productRole;

export const transcodeProductRole2Description = (
  productRole: string,
  productRolesList: ProductRolesLists
) =>
  productRolesList?.groupByProductRole[normalizedProductRole(productRole)]
    ? productRolesList?.groupByProductRole[normalizedProductRole(productRole)].description
    : productRole;
