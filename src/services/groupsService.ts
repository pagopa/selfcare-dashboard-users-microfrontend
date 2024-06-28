import { PageRequest } from '@pagopa/selfcare-common-frontend/lib/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/lib/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { DashboardApi } from '../api/DashboardApiClient';
import { Party } from '../model/Party';
import { PartyGroup, usersGroupPlainResource2PartyGroup } from '../model/PartyGroup';
import { Product } from '../model/Product';
import { ENV } from '../utils/env';
import {
  addMemberToUserGroup as addMemberToUserGroupMocked,
  fetchPartyGroups as fetchPartyGroupsMocked,
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
    const fetchPartyGroupsApi = ENV.USER.ENABLE_USER_V2
      ? DashboardApi.fetchPartyGroupsV2
      : DashboardApi.fetchPartyGroups;

    return fetchPartyGroupsApi(product.id, party.partyId, pageRequest).then((resources) => ({
      content: resources?.content?.map(usersGroupPlainResource2PartyGroup) ?? [],
      page: {
        number: resources.number,
        size: resources.size,
        totalElements: resources.totalElements,
        totalPages: resources.totalPages,
      },
    }));
  }
};

export const addMemberToUserGroup = (id: string, userId: string): Promise<string> => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_API_MOCK_PARTY_USERS === 'true') {
    return addMemberToUserGroupMocked(id, userId);
  } else {
    if (ENV.USER.ENABLE_USER_V2) {
      return DashboardApi.addMemberToUserGroupV2(id, userId).then((_) => userId);
    }
    return DashboardApi.addMemberToUserGroup(id, userId).then((_) => userId);
  }
};