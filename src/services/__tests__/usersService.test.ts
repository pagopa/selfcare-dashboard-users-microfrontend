import {
  mockedInstitutionUserDetailsResource,
  mockedInstitutionUserResource,
  mockedProductUserResource,
  mockedUserResource,
} from '../../api/__mocks__/DashboardApiClient';
import { DashboardApi } from '../../api/DashboardApiClient';
import {
  fetchPartyUsers,
  savePartyUser,
  updatePartyUserStatus,
  fetchUserRegistryByFiscalCode,
  deletePartyUser,
  fetchPartyProductUsers,
  fetchPartyUser,
  addUserProductRoles,
} from '../usersService';
import { mockedParties } from '../../microcomponents/mock_dashboard/data/party';
import { mockedPartyProducts } from '../../microcomponents/mock_dashboard/data/product';
import { mockedUser } from '../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import {
  institutionUserResource2PartyUser,
  institutionUserResource2PartyUserDetail,
  PartyUser,
  PartyUserOnCreation,
  productUserResource2PartyProductUser,
} from '../../model/PartyUser';
import { mockedProductRoles as mockedProductRolesService } from '../../microcomponents/mock_dashboard/data/product';
import { userResource2UserRegistry } from '../../model/UserRegistry';
import { mockedUsers } from '../__mocks__/usersService';
import { buildProductsMap } from '../../model/Product';

jest.mock('../../api/DashboardApiClient');

beforeEach(() => {
  jest.spyOn(DashboardApi, 'getPartyUser');
  jest.spyOn(DashboardApi, 'getPartyUsers');
  jest.spyOn(DashboardApi, 'getPartyProductUsers');
  jest.spyOn(DashboardApi, 'savePartyUser');
  jest.spyOn(DashboardApi, 'suspendPartyRelation');
  jest.spyOn(DashboardApi, 'activatePartyRelation');
  jest.spyOn(DashboardApi, 'fetchUserRegistryByFiscalCode');
  jest.spyOn(DashboardApi, 'deletePartyRelation');
  jest.spyOn(DashboardApi, 'addUserProductRoles');
});

test('Test fetch PartyUserDetails', async () => {
  const partyUserDetail = await fetchPartyUser(
    mockedParties[0].partyId,
    mockedUsers[0].id,
    mockedUser,
    buildProductsMap(mockedPartyProducts)
  );

  expect(partyUserDetail).toMatchObject(
    institutionUserResource2PartyUserDetail(mockedInstitutionUserDetailsResource, {}, mockedUser)
  );

  expect(DashboardApi.getPartyUser).toBeCalledWith(mockedParties[0].partyId, mockedUsers[0].id);
  expect(DashboardApi.getPartyProductUsers).toBeCalledTimes(0);
});

describe('Test fetchPartyUsers', () => {
  const testNoProductFilter = async () => {
    const partyUsers = await fetchPartyUsers(
      { page: 0, size: 20 },
      mockedParties[0],
      buildProductsMap(mockedPartyProducts),
      mockedUser,
      undefined,
      'ADMIN',
      mockedProductRolesService
    );

    expect(partyUsers).toMatchObject({
      page: {
        number: 0,
        size: mockedInstitutionUserResource.length,
        totalElements: mockedInstitutionUserResource.length,
        totalPages: 1,
      },
      content: mockedInstitutionUserResource.map((u) =>
        institutionUserResource2PartyUser(u, {}, mockedUser)
      ),
    });

    expect(DashboardApi.getPartyUsers).toBeCalledTimes(1);
    expect(DashboardApi.getPartyUsers).toBeCalledWith(
      mockedParties[0].partyId,
      undefined,
      'ADMIN',
      mockedProductRolesService
    );
    expect(DashboardApi.getPartyProductUsers).toBeCalledTimes(0);
  };

  test('Test CheckPermission False', async () => {
    await testNoProductFilter();

    const partyProductUsers = await fetchPartyUsers(
      { page: 0, size: 20 },
      mockedParties[0],
      buildProductsMap(mockedPartyProducts),
      mockedUser,
      mockedPartyProducts[0],
      'LIMITED'
    );

    expect(partyProductUsers).toMatchObject({
      page: {
        number: 0,
        size: mockedProductUserResource.length,
        totalElements: mockedProductUserResource.length,
        totalPages: 1,
      },
      content: mockedInstitutionUserResource.map((u) =>
        institutionUserResource2PartyUser(u, {}, mockedUser)
      ),
    });

    expect(DashboardApi.getPartyUsers).toBeCalledTimes(2);
    expect(DashboardApi.getPartyUsers).toBeCalledWith(
      mockedParties[0].partyId,
      mockedPartyProducts[0].id,
      'LIMITED',
      undefined
    );
    expect(DashboardApi.getPartyProductUsers).toBeCalledTimes(0);
  });
});

test('Test fetchPartyProductUser', async () => {
  const partyProductUsers = await fetchPartyProductUsers(
    { page: 0, size: 20 },
    mockedParties[0],
    mockedPartyProducts[0],
    mockedUser,
    buildProductsMap(mockedPartyProducts),
    'LIMITED'
  );

  expect(partyProductUsers).toMatchObject({
    page: {
      number: 0,
      size: mockedProductUserResource.length,
      totalElements: mockedProductUserResource.length,
      totalPages: 1,
    },
    content: mockedProductUserResource.map((r) =>
      productUserResource2PartyProductUser(r, mockedPartyProducts[0], mockedUser)
    ),
  });

  expect(DashboardApi.getPartyUsers).toBeCalledTimes(0);
  expect(DashboardApi.getPartyProductUsers).toBeCalledTimes(1);
  expect(DashboardApi.getPartyProductUsers).toBeCalledWith(
    mockedParties[0].partyId,
    mockedPartyProducts[0].id,
    'LIMITED',
    undefined
  );
});

test('Test savePartyUser', async () => {
  const user: PartyUserOnCreation = {
    name: 'Name',
    surname: 'Surname',
    taxCode: 'fiscalCode',
    email: 'email',
    confirmEmail: 'email',
    productRoles: ['role'],
    certifiedName: true,
    certifiedSurname: true,
    certifiedMail: true,
  };

  const newUserId = await savePartyUser(mockedParties[0], mockedPartyProducts[0], user);

  expect(DashboardApi.savePartyUser).toBeCalledWith(
    mockedParties[0].partyId,
    mockedPartyProducts[0].id,
    user
  );
  expect(newUserId).toBe('newUserId');
});

test('Test addUserProductRoles', async () => {
  const user: PartyUserOnCreation = {
    name: 'Name',
    surname: 'Surname',
    taxCode: 'fiscalCode',
    email: 'email',
    confirmEmail: 'email',
    productRoles: ['role'],
    certifiedName: true,
    certifiedSurname: true,
    certifiedMail: true,
  };

  const userId = await addUserProductRoles(
    mockedParties[0],
    mockedPartyProducts[0],
    'userId',
    user
  );

  expect(DashboardApi.addUserProductRoles).toBeCalledWith(
    mockedParties[0].partyId,
    mockedPartyProducts[0].id,
    'userId',
    user
  );
  expect(userId).toBe('userId');
});

describe('Test updatePartyUserStatus', () => {
  test('Test updatePartyUserStatus', async () => {
    const partyUser: PartyUser = {
      id: 'id',
      name: 'Name',
      surname: 'Surname',
      email: 'email',
      userRole: 'ADMIN',
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
      status: 'ACTIVE',
      isCurrentUser: false,
    };

    await updatePartyUserStatus(
      mockedParties[0],
      partyUser,
      partyUser.products[0],
      partyUser.products[0].roles[0],
      'SUSPENDED'
    );

    expect(DashboardApi.suspendPartyRelation).toBeCalledWith('relationshipId');
    expect(DashboardApi.activatePartyRelation).toBeCalledTimes(0);

    await updatePartyUserStatus(
      mockedParties[0],
      partyUser,
      partyUser.products[0],
      partyUser.products[0].roles[0],
      'ACTIVE'
    );

    expect(DashboardApi.suspendPartyRelation).toBeCalledTimes(1);
    expect(DashboardApi.activatePartyRelation).toBeCalledWith('relationshipId');
  });

  test('Test fetchUserRegistryByFiscalCode', async () => {
    const userRegistry = await fetchUserRegistryByFiscalCode('TaxCode', 'partyId');

    expect(userRegistry).toMatchObject(userResource2UserRegistry(mockedUserResource));

    expect(DashboardApi.fetchUserRegistryByFiscalCode).toBeCalledWith('TaxCode', 'partyId');
  });
});

test('Test deletePartyUser', async () => {
  await deletePartyUser(
    mockedParties[0],
    mockedUsers[0],
    mockedUsers[0].products[0],
    mockedUsers[0].products[0].roles[0]
  );

  expect(DashboardApi.deletePartyRelation).toBeCalledWith(
    mockedUsers[0].products[0].roles[0].relationshipId
  );
});
