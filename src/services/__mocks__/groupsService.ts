import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import {
  applySort,
  extractPageRequest,
} from '@pagopa/selfcare-common-frontend/hooks/useFakePagination';
import { cloneDeep } from 'lodash';
import { Party } from '../../model/Party';
import { Product,  } from '../../model/Product';
import {
  PartyGroup,

  PartyGroupStatus,
} from '../../model/PartyGroup';

type PartyGroupMock = PartyGroup & {
  membersIds: Array<string>;
  createdByUserId: string;
  modifiedByUserId: string;
};

export const mockedGroups: Array<PartyGroupMock> = [
  {
    id: 'groupId1',
    name: 'Gruppo1',
    description:
      'groupId1: use case ACTIVE group having 1 user on product in which loggedUser is ADMIN',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId2',
    name: 'Gruppo2',
    description:
      'groupId2: use case ACTIVE group having 1 user on product in which loggedUser is LIMITED',
    partyId: 'onboarded',
    productId: 'prod-pn',
    status: 'ACTIVE',
    membersIds: ['uid7'],
    createdAt: new Date('2022-01-10'),
    createdByUserId: 'uid7',
    modifiedAt: new Date('2022-01-21 10:00'),
    modifiedByUserId: 'uid7',
  },
  {
    id: 'groupId3',
    name: 'Gruppo3',
    description:
      'groupId3: use case SUSPENDED group having 2 users on product in which loggedUser is ADMIN',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'SUSPENDED',
    membersIds: ['uid', '0'],
    createdAt: new Date('2022-02-01'),
    createdByUserId: '0',
    modifiedAt: new Date('2022-02-08 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId4',
    name: 'Gruppo4',
    description:
      'groupId4: use case SUSPENDED group having 2 user on product in which loggedUser is LIMITED',
    partyId: 'onboarded',
    productId: 'prod-pn',
    status: 'SUSPENDED',
    membersIds: ['uid6', 'uid7'],
    createdAt: new Date('2022-03-01'),
    createdByUserId: 'uid7',
    modifiedAt: new Date('2022-03-01'),
    modifiedByUserId: 'uid7',
  },

  {
    id: 'groupId5',
    name: 'Gruppo5',
    description: 'groupId5 : use case ACTIVE group having 1 user ACTIVE and 1 user SUSPENDED',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid', 'uid3'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId6',
    name: 'Gruppo6',
    description: 'groupId6 : use case ACTIVE and user has no privileges ',
    partyId: 'onboarded',
    productId: 'prod-ciban',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId7',
    name: 'Gruppo7',
    description: 'groupId7 : use case ACTIVE group with loggedUser which is ADMIN in prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['0'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: '0',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: '0',
  },
  {
    id: 'groupId8',
    name: 'Gruppo8',
    description: 'Group to have a significant number on prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId9',
    // use case management of particulary long group name
    name: 'AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9AparticularylongGroupName9',
    // use case management of particulary long description
    description:
      'AparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroupAparticularylongdescriptionofgroup',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId10',
    name: 'Gruppo10',
    description: 'Group to have a significant number on prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId11',
    name: 'Gruppo11',
    description: 'Group to have a significant number on prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId12',
    name: 'Gruppo12',
    description: 'Group to have a significant number on prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId13',
    name: 'Gruppo13',
    description: 'Group to have a significant number on prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['uid'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
].map((o) => ({
  ...o,
  membersCount: o.membersIds.length,
  status: o.status as PartyGroupStatus,
}));


export const fetchPartyGroups = (
  party: Party,
  product: Product,
  _currentUser: User,
  pageRequest: PageRequest
): Promise<PageResource<PartyGroup>> => {
  const filteredContent = mockedGroups
    .slice()
    .filter((u) => {
      if (u.partyId !== party.partyId) {
        return false;
      }
      return product.id.indexOf(u.productId) > -1;
    })
    .map((u) => cloneDeep(u));

  if (pageRequest.sort) {
    applySort(filteredContent, pageRequest.sort);
  }
  return new Promise((resolve) =>
    setTimeout(() => resolve(extractPageRequest(filteredContent, pageRequest)), 100)
  );
};

export const addMemberToUserGroup = (
  _id: string,
  userId: string,
): Promise<string> => new Promise((resolve) => resolve(userId));