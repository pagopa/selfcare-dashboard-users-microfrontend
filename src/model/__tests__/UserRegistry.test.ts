import { UserResource } from '../../api/generated/b4f-dashboard/UserResource';
import { userResource2UserRegistry } from '../UserRegistry';

test('Test UserResource2UserRegistry', () => {
  const userResource: UserResource = {
    id: 'id',
    fiscalCode: 'AAAAAA11A11A123K',
    name: { certified: true, value: 'Gigi' },
    familyName: { certified: true, value: 'Verdi' },
    email: { certified: true, value: 'gigi.v@email.com' },
  };

  const user = userResource2UserRegistry(userResource);
  expect(user).toStrictEqual({
    taxCode: 'AAAAAA11A11A123K',
    name: 'Gigi',
    surname: 'Verdi',
    email: 'gigi.v@email.com',
    certifiedName: true,
    certifiedSurname: true,
    certifiedMail: true,
  });
});
