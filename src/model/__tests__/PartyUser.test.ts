import { InstitutionUserDetailsResource } from '../../api/generated/b4f-dashboard/InstitutionUserDetailsResource';
import {
  InstitutionUserResource,
  RoleEnum,
} from '../../api/generated/b4f-dashboard/InstitutionUserResource';
import { SelcRoleEnum } from '../../api/generated/b4f-dashboard/ProductRoleInfoResource';
import { ProductUserResource } from '../../api/generated/b4f-dashboard/ProductUserResource';
import { mockedPartyProducts } from '../../microcomponents/mock_dashboard/data/product';
import { mockedUser } from '../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import {
  institutionUserResource2PartyUser,
  institutionUserResource2PartyUserDetail,
  productUserResource2PartyProductUser,
} from '../PartyUser';

test('Test institutionUserResource2PartyUserDetail', () => {
  const institutionUserResource: InstitutionUserResource = {
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
