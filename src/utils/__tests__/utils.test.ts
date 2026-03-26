import { SelcRoleEnum } from '../../api/generated/b4f-dashboard/ProductRoleInfoResource';
import { AllUserInfo, PartyProductUser } from '../../model/PartyUser';
import { sortedUsers } from '../utils';

describe('sortedUsers', () => {
  const allUserInfo1: AllUserInfo = {
    id: '1',
    name: 'Zoe',
    surname: 'SurnameZ',
    fiscalCode: 'TAXCODE1',
    email: 'zoe@example.com',
    partyRole: 'OPERATOR',
    status: 'ACTIVE',
    isCurrentUser: false,
  };
  const allUserInfo2: AllUserInfo = {
    id: '2',
    name: 'Alice',
    surname: 'SurnameA',
    fiscalCode: 'TAXCODE2',
    email: 'alice@example.com',
    partyRole: 'OPERATOR',
    status: 'ACTIVE',
    isCurrentUser: false,
  };
  const currentAllUserInfo: AllUserInfo = {
    id: '0',
    name: 'Me',
    surname: 'Self',
    fiscalCode: 'ME123',
    email: 'me@example.com',
    partyRole: 'MANAGER',
    status: 'ACTIVE',
    isCurrentUser: true,
  };

  const partyProductUser1: PartyProductUser = {
    id: 'p1',
    name: 'Walter',
    surname: 'White',
    email: 'walter@example.com',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    isCurrentUser: false,
    product: {
      id: 'prod',
      title: 'Product',
      roles: [
        { relationshipId: 'rel1', role: 'admin', selcRole: SelcRoleEnum.ADMIN, status: 'ACTIVE' },
      ],
    },
  };

  test('should pin current user to top for AllUserInfo', () => {
    const unsorted: Array<AllUserInfo> = [allUserInfo1, currentAllUserInfo, allUserInfo2];
    const sorted = sortedUsers(unsorted);
    expect(sorted[0]).toEqual(currentAllUserInfo);
    expect(sorted[1].name).toBe('Alice');
    expect(sorted[2].name).toBe('Zoe');
  });

  test('should pin current user to top for PartyProductUser', () => {
    const currentPartyProductUser = { ...partyProductUser1, id: 'me-p', isCurrentUser: true };
    const unsorted: Array<PartyProductUser> = [partyProductUser1, currentPartyProductUser];
    const sorted = sortedUsers(unsorted);
    expect(sorted[0]).toEqual(currentPartyProductUser);
  });

  test('should sort by name then surname as fallback', () => {
    const u1 = { ...allUserInfo1, name: 'A', surname: 'B' };
    const u2 = { ...allUserInfo1, name: 'A', surname: 'A' };
    const sorted = sortedUsers([u1, u2]);
    expect(sorted[0].surname).toBe('A');
    expect(sorted[1].surname).toBe('B');
  });
});
