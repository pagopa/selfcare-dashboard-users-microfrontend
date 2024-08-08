import { PageRequest } from '@pagopa/selfcare-common-frontend/lib/model/PageRequest';
import { EmailString } from '@pagopa/ts-commons/lib/strings';
import { PartyUserOnCreation } from '../../model/PartyUser';
import { ProductRole } from '../../model/ProductRole';
import { InstitutionUserDetailsResource, RoleEnum } from '../generated/b4f-dashboard/InstitutionUserDetailsResource';
import { SelcRoleEnum } from '../generated/b4f-dashboard/ProductRoleInfoResource';
import { ProductUserResource } from '../generated/b4f-dashboard/ProductUserResource';
import {
  StatusEnum,
  UserGroupPlainResource,
} from '../generated/b4f-dashboard/UserGroupPlainResource';
import { UserIdResource } from '../generated/b4f-dashboard/UserIdResource';
import { UserResource } from '../generated/b4f-dashboard/UserResource';

export const mockedInstitutionUserDetailsResource: InstitutionUserDetailsResource = {
  id: '1',
  fiscalCode: 'AAAAAA11A11A123K',
  name: 'Name',
  surname: 'Surname',
  status: 'PENDING',
  role: 'LIMITED' as RoleEnum,
  email: 'email@example.com' as EmailString,
  products: [
    {
      id: 'productId',
      title: 'productTitle',
      roleInfos: [
        {
          relationshipId: 'relId',
          role: 'incaricato-ente-creditore',
          selcRole: SelcRoleEnum.ADMIN,
          status: 'ACTIVE',
        },
      ],
    },
  ],
};

export const mockedInstitutionUserResource: Array<InstitutionUserDetailsResource> = [
  {
    id: '1',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    role: 'LIMITED' as RoleEnum,
    email: 'email@example.com' as EmailString,
    products: [
      {
        id: 'productId',
        title: 'productTitle',
        roleInfos: [
          {
            relationshipId: 'relId',
            role: 'incaricato-ente-creditore',
            selcRole: SelcRoleEnum.ADMIN,
            status: 'ACTIVE',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Name2',
    surname: 'Surname2',
    status: 'ACTIVE',
    role: 'ADMIN' as RoleEnum,
    email: 'email@example.com' as EmailString,
    products: [
      {
        id: 'productId2',
        title: 'productTitle2',
        roleInfos: [
          {
            relationshipId: 'relId',
            role: 'incaricato-ente-creditore',
            selcRole: SelcRoleEnum.ADMIN,
            status: 'ACTIVE',
          },
        ],
      },
    ],
  },
];

export const mockedProductUserResource: Array<ProductUserResource> = [
  {
    id: '1',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    role: 'LIMITED' as RoleEnum,
    email: 'email@example.com' as EmailString,
    product: {
      id: 'prod-io',
      title: 'App IO',
      roleInfos: [
        {
          relationshipId: 'relationshipId',
          role: 'incaricato-ente-creditore',
          selcRole: SelcRoleEnum.ADMIN,
          status: 'ACTIVE',
        },
      ],
    },
  },
  {
    id: '2',
    name: 'Name2',
    surname: 'Surname2',
    status: 'ACTIVE',
    role: 'ADMIN' as RoleEnum,
    email: 'email@example.com' as EmailString,
    product: {
      id: 'prod-io',
      title: 'App IO',
      roleInfos: [
        {
          relationshipId: 'relationshipId2',
          role: 'incaricato-ente-creditore',
          selcRole: SelcRoleEnum.ADMIN,
          status: 'ACTIVE',
        },
      ],
    },
  },
];

export const mockedUserResource: UserResource = {
  id: 'id',
  fiscalCode: 'AAAAAA11A11A123K',
  name: { certified: true, value: 'Gigi' },
  familyName: { certified: true, value: 'Verdi' },
  email: { certified: true, value: 'gigi.v@email.com' },
};

export const userGroupPlainResourceArray: Array<UserGroupPlainResource> = [
  {
    description: 'groupId1: descriptoion',
    id: 'groupId1',
    institutionId: 'onboarded',
    membersCount: 1,
    name: 'Gruppo1',
    productId: 'prod-io',
    status: StatusEnum.ACTIVE,
    createdAt: new Date('2022-01-01'),
    createdBy: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedBy: 'uid',
  },
];

export const DashboardApi = {
  getPartyUser: async (
    _institutionId: string,
    _userId: string
  ): Promise<InstitutionUserDetailsResource | null> =>
    new Promise((resolve) => resolve(mockedInstitutionUserDetailsResource)),

  getPartyUsers: async (
    _institutionId: string,
    _productId?: string,
    _role?: string,
    _productRoles?: Array<ProductRole>
  ): Promise<Array<InstitutionUserDetailsResource>> =>
    new Promise((resolve) => resolve(mockedInstitutionUserResource)),

  getPartyProductUsers: async (
    _institutionId: string,
    _productId: string,
    _role?: string
  ): Promise<Array<ProductUserResource>> =>
    new Promise((resolve) => resolve(mockedProductUserResource)),

  savePartyUser: async (
    _institutionId: string,
    _productId: string,
    _user: PartyUserOnCreation
  ): Promise<UserIdResource> => new Promise((resolve) => resolve({ id: 'newUserId' })),

  suspendPartyRelation: async (_relationshipId: string): Promise<void> =>
    new Promise((resolve) => resolve()),

  activatePartyRelation: async (_relationshipId: string): Promise<void> =>
    new Promise((resolve) => resolve()),

  fetchUserRegistryByFiscalCode: async (_taxCode: string): Promise<UserResource | null> =>
    new Promise((resolve) => resolve(mockedUserResource)),

  deletePartyRelation: async (_relationshipId: string): Promise<void> =>
    new Promise<void>((resolve) => resolve()),

  addUserProductRoles: async (
    _institutionId: string,
    _productId: string,
    _userId: string,
    _user: PartyUserOnCreation
  ): Promise<void> => new Promise<void>((resolve) => resolve()),

  fetchPartyGroups: async (
    _productId: string,
    _institutionId: string,
    _pageRequest: PageRequest
  ): Promise<Array<UserGroupPlainResource>> =>
    new Promise((resolve) => resolve(userGroupPlainResourceArray)),

    addMemberToUserGroup: async (
      _id: string,
      _userId: string,
    ): Promise<void> => 
    new Promise((resolve) => resolve()),
};
