import { productRoles2ProductRolesList, ProductRole } from '../ProductRole';

const adminEaIoRole: ProductRole = {
  productId: 'prod-io',
  partyRole: 'ADMIN_EA_IO',
  selcRole: 'ADMIN',
  multiroleGroups: [],
  productRole: 'admin-ea-io',
  title: 'Admin EA IO',
  description: 'Admin EA IO role',
  phasesAdditionAllowed: ['dashboard'],
};

test('preserves the input order in the roles list', () => {
  const operatorRole: ProductRole = {
    ...adminEaIoRole,
    partyRole: 'OPERATOR',
    selcRole: 'LIMITED',
    productRole: 'operator',
  };
  const standardAdminRole: ProductRole = {
    ...adminEaIoRole,
    partyRole: 'DELEGATE',
    productRole: 'admin',
  };
  const partnerAdminRole: ProductRole = {
    ...adminEaIoRole,
    partyRole: 'SUB_DELEGATE',
    productRole: 'admin-psp-pt',
  };
  const roles = [operatorRole, standardAdminRole, partnerAdminRole];

  expect(productRoles2ProductRolesList(roles).list).toEqual(roles);
});

test('groups ADMIN_EA_IO product roles by party role', () => {
  const rolesList = productRoles2ProductRolesList([adminEaIoRole]);

  expect(rolesList.groupByPartyRole.ADMIN_EA_IO).toEqual([adminEaIoRole]);
});

test('does not group ADMIN_EA as a selc role', () => {
  const adminEaRole = {
    ...adminEaIoRole,
    partyRole: 'ADMIN_EA' as const,
    selcRole: 'ADMIN_EA' as ProductRole['selcRole'],
    productRole: 'admin-ea',
  };

  const rolesList = productRoles2ProductRolesList([adminEaRole]);

  expect(rolesList.list).toEqual([adminEaRole]);
  expect(rolesList.groupByPartyRole.ADMIN_EA).toEqual([adminEaRole]);
  expect(rolesList.groupBySelcRole.ADMIN).toEqual([]);
  expect(rolesList.groupBySelcRole.LIMITED).toEqual([]);
});
