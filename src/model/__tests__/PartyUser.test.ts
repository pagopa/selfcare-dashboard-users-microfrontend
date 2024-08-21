import { mockedUser } from '../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import { InstitutionUserDetailsResource, RoleEnum } from '../../api/generated/b4f-dashboard/InstitutionUserDetailsResource';
import { SelcRoleEnum } from '../../api/generated/b4f-dashboard/ProductRoleInfoResource';
import { ProductUserResource } from '../../api/generated/b4f-dashboard/ProductUserResource';
import { mockedPartyProducts } from '../../microcomponents/mock_dashboard/data/product';
import {
  PartyUser,
  PartyUserDetail,
  checkSuspendedUser,
  institutionUserResource2PartyUser,
  institutionUserResource2PartyUserDetail,
  partyUserDetail2User,
  productUserResource2PartyProductUser,
} from '../PartyUser';

test('Test institutionUserResource2PartyUserDetail', () => {
  const institutionUserResource: InstitutionUserDetailsResource = {
    id: '1',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    role: 'LIMITED' as RoleEnum,
    email: 'address',
    products: [
      {
        id: 'productId',
        title: 'productTitle',
        roleInfos: [
          {
            relationshipId: 'relationshipId',
            role: 'productRole',
            selcRole: SelcRoleEnum.ADMIN,
            status: 'ACTIVE',
          },
        ],
      },
    ],
  };

  const partyUser = institutionUserResource2PartyUser(institutionUserResource, {}, mockedUser);
  expect(partyUser).toStrictEqual({
    id: '1',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    userRole: 'LIMITED',
    email: 'address',
    products: [
      {
        id: 'productId',
        title: 'productTitle',
        roles: [
          {
            relationshipId: 'relationshipId',
            role: 'productRole',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  });

  institutionUserResource.id = mockedUser.uid;
  expect(
    institutionUserResource2PartyUser(institutionUserResource, {}, mockedUser).isCurrentUser
  ).toBeTruthy();
});

test('Test institutionUserResource2PartyUserDetail', () => {
  const institutionUserResource: InstitutionUserDetailsResource = {
    id: '1',
    fiscalCode: 'fiscalCode',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    role: 'LIMITED' as RoleEnum,
    email: 'address',
    products: [
      {
        id: 'productId',
        title: 'productTitle',
        roleInfos: [
          {
            relationshipId: 'relationshipId',
            role: 'productRole',
            selcRole: SelcRoleEnum.ADMIN,
            status: 'ACTIVE',
          },
        ],
      },
    ],
  };

  const partyUser = institutionUserResource2PartyUserDetail(
    institutionUserResource,
    {},
    mockedUser
  );
  expect(partyUser).toStrictEqual({
    id: '1',
    taxCode: 'fiscalCode',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    userRole: 'LIMITED',
    email: 'address',
    products: [
      {
        id: 'productId',
        title: 'productTitle',
        roles: [
          {
            relationshipId: 'relationshipId',
            role: 'productRole',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  });

  institutionUserResource.id = mockedUser.uid;
  expect(
    institutionUserResource2PartyUserDetail(institutionUserResource, {}, mockedUser).isCurrentUser
  ).toBeTruthy();
});

test('Test productUserResource2PartyProductUser', () => {
  const productUserResource: ProductUserResource = {
    id: '1',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    role: 'LIMITED' as RoleEnum,
    email: 'address',
    product: {
      id: 'productId',
      title: 'productTitle',
      roleInfos: [
        {
          relationshipId: 'relationshipId',
          role: 'productRole',
          selcRole: SelcRoleEnum.ADMIN,
          status: 'ACTIVE',
        },
      ],
    },
  };

  const partyUser = productUserResource2PartyProductUser(
    productUserResource,
    mockedPartyProducts[0],
    mockedUser
  );
  expect(partyUser).toStrictEqual({
    id: '1',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    userRole: 'LIMITED',
    email: 'address',
    product: {
      id: 'productId',
      title: 'productTitle',
      roles: [
        {
          relationshipId: 'relationshipId',
          role: 'productRole',
          selcRole: 'ADMIN',
          status: 'ACTIVE',
        },
      ],
    },
    isCurrentUser: false,
  });

  productUserResource.id = mockedUser.uid;
  expect(
    productUserResource2PartyProductUser(productUserResource, mockedPartyProducts[0], mockedUser)
      .isCurrentUser
  ).toBeTruthy();
});

test('Test partyUserDetail2User', () => {
  const partyUserDetail: PartyUserDetail = {
    id: '1',
    taxCode: 'fiscalCode',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    email: 'address',
    userRole: 'LIMITED',
    isCurrentUser: false,
    products: [
      {
        id: 'productId',
        title: 'productTitle',
        roles: [
          {
            relationshipId: 'relationshipId',
            role: 'productRole',
            selcRole: SelcRoleEnum.ADMIN,
            status: 'ACTIVE',
          },
        ],
      },
    ],
  };

  const user = partyUserDetail2User(partyUserDetail);
  expect(user).toStrictEqual({
    uid: '1',
    taxCode: 'fiscalCode',
    name: 'Name',
    surname: 'Surname',
    email: 'address',
  });
});

test('Test checkSuspendedUser', () => {
  const suspendedUser: PartyUser = {
    id: '12',
    name: 'Pino',
    surname: 'Pi',
    email: 'pino.pi@comunedi.com',
    isCurrentUser: true,
    userRole: 'ADMIN',
    products: [
      {
        id: 'productId',
        title: 'productTitle',
        roles: [
          {
            relationshipId: 'relationshipId',
            role: 'productRole',
            selcRole: SelcRoleEnum.ADMIN,
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    status: 'SUSPENDED',
  };
  const isSuspended = checkSuspendedUser(suspendedUser);
  expect(isSuspended).toBeTruthy();
});
