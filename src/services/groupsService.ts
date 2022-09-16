import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { DashboardApi } from '../api/DashboardApiClient';
import { Party } from '../model/Party';
import {
  PartyGroup,
  usersGroupPlainResource2PartyGroup,
} from '../model/PartyGroup';
import { Product } from '../model/Product';
import {
  fetchPartyGroups as fetchPartyGroupsMocked,
  addMemberToUserGroup as addMemberToUserGroupMocked,
} from './__mocks__/groupsService';

export const fetchPartyGroups = (
  party: Party,
  product: Product,
  currentUser: User,
  pageRequest: PageRequest
): Promise<PageResource<PartyGroup>> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_GROUPS === 'true') {
    return fetchPartyGroupsMocked(party, product, currentUser, pageRequest);
  } else {
    return DashboardApi.fetchPartyGroups(product.id, party.partyId, pageRequest).then(
      (resources) => ({
        content: resources?.content?.map(usersGroupPlainResource2PartyGroup) ?? [],
        page: {
          number: resources.number,
          size: resources.size,
          totalElements: resources.totalElements,
          totalPages: resources.totalPages,
        },
      })
    );
  }
};



export const addMemberToUserGroup = (
  id: string,
  userId: string,
): Promise<string> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return addMemberToUserGroupMocked(id, userId);
  } else {
    return DashboardApi.addMemberToUserGroup(id, userId).then(
      (_) => userId
    );
  }
};