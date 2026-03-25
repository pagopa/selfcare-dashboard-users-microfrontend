import { AllUserInfo, PartyProductUser } from '../model/PartyUser';

export const sortedUsers = <T extends { isCurrentUser: boolean; name: string; surname: string }>(
  users: Array<T>
) =>
  [...users].sort((firstUser: T, secondUser: T) => {
    // Prioritize the current user at the top
    if (firstUser.isCurrentUser) {
      return -1;
    } else if (secondUser.isCurrentUser) {
      return 1;
    }

    const regexp = /[_"'.,;-]+/g;
    const firstUserSurname = `${firstUser.surname}`?.replace(regexp, '').toLowerCase();
    const secondUserSurname = `${secondUser.surname}`?.replace(regexp, '').toLowerCase();

    if (firstUserSurname && secondUserSurname) {
      if (firstUserSurname === secondUserSurname) {
        return firstUser.name.toLowerCase().localeCompare(secondUser.name.toLowerCase());
      } else {
        return firstUserSurname.localeCompare(secondUserSurname);
      }
    } else {
      return 0;
    }
  });
  
const phoneRegex = /^\+?\d{7,15}$/;

export const isValidPhone = (phone?: string) => phoneRegex.test(phone ?? '');

export const isUserSuspended = (user: PartyProductUser | AllUserInfo): boolean => {
  if ('product' in user) {
    return user.status === 'SUSPENDED' || !user.product.roles?.find((r) => r.status !== 'SUSPENDED');
  }
  return false;
};
