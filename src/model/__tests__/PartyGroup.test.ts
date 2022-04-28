import { usersGroupPlainResource2PartyGroup } from '../PartyGroup';
import {
  StatusEnum,
  UserGroupPlainResource,
} from '../../api/generated/b4f-dashboard/UserGroupPlainResource';

test('Test usersGroupPlainResource2PartyGroup', () => {
  const userGroupPlainResource: UserGroupPlainResource = {
    description: 'groupId1: descriptoion',
    id: 'groupId1',
    partyId: 'onboarded',
    membersCount: 1,
    name: 'Gruppo1',
    productId: 'prod-io',
    status: StatusEnum.ACTIVE,
    createdAt: new Date('2022-01-01'),
    createdBy: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedBy: 'uid',
  };

  const partyGroup = usersGroupPlainResource2PartyGroup(userGroupPlainResource);
  expect(partyGroup).toStrictEqual({
    id: 'groupId1',
    partyId: 'onboarded',
    productId: 'prod-io',
    name: 'Gruppo1',
    description: 'groupId1: descriptoion',
    status: 'ACTIVE',
    membersCount: 1,
    createdAt: new Date('2022-01-01'),
    modifiedAt: new Date('2022-01-01 16:00'),
  });
});
