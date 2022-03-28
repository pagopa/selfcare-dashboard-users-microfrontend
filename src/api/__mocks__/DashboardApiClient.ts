import { PartyUserOnCreation } from '../../model/PartyUser';
import { ProductRole } from '../../model/ProductRole';
import {
  InstitutionUserResource,
  RoleEnum,
} from '../generated/b4f-dashboard/InstitutionUserResource';
import { SelcRoleEnum } from '../generated/b4f-dashboard/ProductRoleInfoResource';
import { ProductUserResource } from '../generated/b4f-dashboard/ProductUserResource';
import { UserResource } from '../generated/b4f-dashboard/UserResource';

export const mockedInstitutionUserResource: Array<InstitutionUserResource> = [
  {
    id: '1',
    name: 'Name',
    surname: 'Surname',
    status: 'PENDING',
    role: 'LIMITED' as RoleEnum,
    email: 'address',
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
    email: 'address',
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
    email: 'address',
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
    certification: true,
  },
  {
    id: '2',
    name: 'Name2',
    surname: 'Surname2',
    status: 'ACTIVE',
    role: 'ADMIN' as RoleEnum,
    email: 'address2',
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
    certification: true,
  },
];

export const mockedUserResource: UserResource = {
  fiscalCode: 'AAAAAA11A11A123K',
  name: 'Gigi',
  surname: 'Verdi',
  email: 'gigi.v@email.com',
  certification: true,
};

export const DashboardApi = {
  getPartyUsers: async (
    _institutionId: string,
    _productId?: string,
    _role?: string,
    _productRoles?: Array<ProductRole>
  ): Promise<Array<InstitutionUserResource>> =>
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
  ): Promise<void> => new Promise((resolve) => resolve()),

  suspendPartyRelation: async (_relationshipId: string): Promise<void> =>
    new Promise((resolve) => resolve()),

  activatePartyRelation: async (_relationshipId: string): Promise<void> =>
    new Promise((resolve) => resolve()),

  fetchUserRegistryByFiscalCode: async (_taxCode: string): Promise<UserResource | null> =>
    new Promise((resolve) => resolve(mockedUserResource)),

  deletePartyRelation: async (_relationshipId: string): Promise<void> =>
    new Promise<void>((resolve) => resolve()),
};
