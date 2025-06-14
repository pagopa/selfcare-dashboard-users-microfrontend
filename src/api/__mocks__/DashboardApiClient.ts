import { PageRequest } from '@pagopa/selfcare-common-frontend/lib/model/PageRequest';
import { EmailString } from '@pagopa/ts-commons/lib/strings';
import { PartyUserOnCreation } from '../../model/PartyUser';
import { ProductRole } from '../../model/ProductRole';
import { CheckUserResponse } from '../generated/b4f-dashboard/CheckUserResponse';
import {
  InstitutionUserDetailsResource,
  RoleEnum,
} from '../generated/b4f-dashboard/InstitutionUserDetailsResource';
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

export const mockedProductUserResource: Array<any> = [
  {
    id: '1',
    name: 'Name',
    surname: 'Surname',
    fiscalCode: 'SRNNMA80A01F205T',
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
    fiscalCode: 'SRNNMA80A01F205T',
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

export const mockedLegalRepresentativeResource: Array<ProductUserResource> = [
  {
    createdAt: new Date('2022-01-01'),
    email: 'string',
    fiscalCode: 'string',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'string',
    product: {
      id: 'string',
      roleInfos: [
        {
          relationshipId: 'string',
          role: 'string',
          selcRole: SelcRoleEnum.ADMIN,
          status: 'string',
        },
      ],
      title: 'string',
    },
    role: RoleEnum.ADMIN,
    status: 'string',
    surname: 'string',
  },
  {
    createdAt: new Date('2022-03-03'),
    email: 'string',
    fiscalCode: 'string',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'string',
    product: {
      id: 'string',
      roleInfos: [
        {
          relationshipId: 'string',
          role: 'string',
          selcRole: SelcRoleEnum.ADMIN,
          status: 'string',
        },
      ],
      title: 'string',
    },
    role: RoleEnum.ADMIN,
    status: 'string',
    surname: 'string',
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
    Promise.resolve(mockedInstitutionUserDetailsResource),

  getPartyUsers: async (
    _institutionId: string,
    _productId?: string,
    _role?: string,
    _productRoles?: Array<ProductRole>
  ): Promise<Array<InstitutionUserDetailsResource>> =>
    Promise.resolve(mockedInstitutionUserResource),

  getPartyProductUsers: async (
    _institutionId: string,
    _productId: string,
    _role?: string
  ): Promise<Array<ProductUserResource>> => Promise.resolve(mockedProductUserResource),

  getLegalRepresentative: async (
    _institutionId: string,
    _productId?: string,
    _roles?: string
  ): Promise<Array<ProductUserResource>> => Promise.resolve(mockedProductUserResource),

  savePartyUser: async (
    _institutionId: string,
    _productId: string,
    _user: PartyUserOnCreation
  ): Promise<UserIdResource> => Promise.resolve({ id: 'newUserId' }),

  suspendPartyRelation: async (_relationshipId: string): Promise<void> => Promise.resolve(),

  activatePartyRelation: async (_relationshipId: string): Promise<void> => Promise.resolve(),

  fetchUserRegistryByFiscalCode: async (_taxCode: string): Promise<UserResource | null> =>
    Promise.resolve(mockedUserResource),

  deletePartyRelation: async (_relationshipId: string): Promise<void> => Promise.resolve(),

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
  ): Promise<Array<UserGroupPlainResource>> => Promise.resolve(userGroupPlainResourceArray),

  addMemberToUserGroup: async (_id: string, _userId: string): Promise<void> => Promise.resolve(),

  checkUser: async (
    _institutionId: string,
    _productId: string,
    _fiscalCode: string
  ): Promise<CheckUserResponse> =>
    Promise.resolve({
      isUserOnboarded: true,
    }),
};
