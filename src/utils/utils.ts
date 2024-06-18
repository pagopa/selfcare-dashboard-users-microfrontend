import { PartyProductUser } from '../model/PartyUser';

export const sortedUsers = (users: Array<PartyProductUser>) =>
  [...users].sort((firstUser: PartyProductUser, secondUser: PartyProductUser) => {
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
