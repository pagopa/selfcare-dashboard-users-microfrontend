import { UserResource } from '../../api/generated/b4f-dashboard/UserResource';
import { userResource2UserRegistry } from '../UserRegistry';

test('Test UserResource2UserRegistry', () => {
  const userResource: UserResource = {
    fiscalCode: 'AAAAAA11A11A123K',
    name: 'Gigi',
    surname: 'Verdi',
    email: 'gigi.v@email.com',
    certification: true,
  };

  const user = userResource2UserRegistry(userResource);
  expect(user).toStrictEqual({
    taxCode: 'AAAAAA11A11A123K',
    name: 'Gigi',
    surname: 'Verdi',
    email: 'gigi.v@email.com',
    certification: true,
  });
});
