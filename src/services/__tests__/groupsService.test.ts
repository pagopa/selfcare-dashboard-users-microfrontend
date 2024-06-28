import { DashboardApi } from '../../api/DashboardApiClient';
import { mockedParties } from '../../microcomponents/mock_dashboard/data/party';
import {
  addMemberToUserGroup,
  fetchPartyGroups,
} from './../groupsService';
import { mockedPartyProducts } from '../../microcomponents/mock_dashboard/data/product';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';

jest.mock('../../api/DashboardApiClient');

beforeEach(() => {
  jest.spyOn(DashboardApi, 'fetchPartyGroups');
  jest.spyOn(DashboardApi, 'addMemberToUserGroup');
});

const currentUser: User = {
  name: 'NAME',
  surname: 'SURNAME',
  uid: 'UID',
  taxCode: 'AAAAAA00A00A000A',
  email: 'a@a.aa',
};

test('Test fetchPartyGroups', async () => {
  await fetchPartyGroups(mockedParties[0], mockedPartyProducts[0], currentUser, {
    page: 0,
    size: 20,
  });
  expect(DashboardApi.fetchPartyGroups).toBeCalledWith(
    mockedPartyProducts[0].id,
    mockedParties[0].partyId,
    {
      page: 0,
      size: 20,
    }
  );
});

test('Test addMemberToUserGroup', async () => {
  const userId = await addMemberToUserGroup(
    'id',
    'userId'
  );

  expect(DashboardApi.addMemberToUserGroup).toBeCalledWith(
    'id',
    'userId'
  );
  expect(userId).toBe('userId');
});
