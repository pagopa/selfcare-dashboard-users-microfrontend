import { PageRequest } from '@pagopa/selfcare-common-frontend/model/PageRequest';
import { PageResource } from '@pagopa/selfcare-common-frontend/model/PageResource';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import {
  applySort,
  extractPageRequest,
} from '@pagopa/selfcare-common-frontend/hooks/useFakePagination';
import { cloneDeep } from 'lodash';
import { EmailString } from '@pagopa/ts-commons/lib/strings';
import { Party, UserRole, UserStatus } from '../../model/Party';
import {
  BasePartyUser,
  PartyProductUser,
  PartyUser,
  PartyUserDetail,
  PartyUserOnCreation,
  PartyUserOnEdit,
  PartyUserProduct,
  PartyUserProductRole,
} from '../../model/PartyUser';
import { Product, ProductsMap } from '../../model/Product';
import { ProductRole } from '../../model/ProductRole';
import { UserRegistry } from '../../model/UserRegistry';
import { PartyGroup, PartyGroupStatus } from '../../model/PartyGroup';

export const mockedUsers: Array<PartyUserDetail> = [
  // use case ACTIVE on 1 product/role
  {
    id: 'uid',
    taxCode: 'VRDLNE80A01F205I',
    name: 'Elena',
    surname: 'Verdi',
    email: 'simone.v@comune.milano.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel1',
            role: 'incaricato-ente-creditore',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  // logged user
  {
    id: '0',
    taxCode: 'AAAAAA11A11A124A',
    name: 'loggedName',
    surname: 'loggedSurname',
    email: 'loggedName.b@email.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel2',
            role: 'incaricato-ente-creditore',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      },
      {
        title: 'Piattaforma Notifiche',
        id: 'prod-pn',
        roles: [
          {
            relationshipId: 'rel2',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
      // Use case introduced for selfcare pnpg
      {
        title: 'SEND',
        id: 'prod-pn-pg',
        roles: [
          {
            relationshipId: 'rel2',
            role: 'Amministratore',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      },
      {
        title: 'PagoPa',
        id: 'prod-pagopa',
        roles: [
          {
            relationshipId: 'rel2',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: true,
  },

  // use case SUSPENDED having just 1 product/role
  {
    id: 'uid3',
    taxCode: 'TAXCOD03A00A123P',
    // use case of management of particularly long name and surname
    name: 'Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3Simone3',
    surname:
      'Bianchi3 Verdi Verdi Verdi Bianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi VerdiBianchi3 Verdi Verdi',
    // use case of management of particularly long email addresses
    email:
      'giuseppe.b@comunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomunecomune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel3',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },

  // use case ACTIVE having 1 product and 2 roles (ACTIVE and SUSPENDED)
  {
    id: 'uid4',
    taxCode: 'TAXCOD04A00A123P',
    name: 'Simone',
    surname: 'Simonetti',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel4',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
          {
            relationshipId: 'rel4_2',
            role: 'operatore-sicurezza',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },

  // use case SUSPENDED having 1 product and 2 roles
  {
    id: 'uid5',
    taxCode: 'TAXCOD05A00A123P',
    name: 'Simone',
    surname: 'Franceschini Alberti',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel4',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
          {
            relationshipId: 'rel4_2',
            role: 'operatore-sicurezza',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },

  // use case SUSPENDED on 2 product, in 1 of them not logged user is not ADMIN
  {
    id: 'uid6',
    taxCode: 'TAXCOD06A00A123P',
    name: 'Simone6',
    surname: 'Bianchi6',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel6',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
      {
        title: 'Piattaforma Notifiche',
        id: 'prod-pn',
        roles: [
          {
            relationshipId: 'rel6',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },

  // use case ACTIVE on 1 product/role in which logged user is not ADMIN
  {
    id: 'uid7',
    taxCode: 'TAXCOD07A00A123P',
    name: 'Simone7',
    surname: 'Bianchi7',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        title: 'Piattaforma Notifiche',
        id: 'prod-pn',
        roles: [
          {
            relationshipId: 'rel7',
            role: 'referente-tecnico',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },

  // use case ACTIVE on 1 product having 2 roles
  {
    id: 'uid8',
    taxCode: 'TAXCOD08A00A123P',
    name: 'Simone8',
    surname: 'Bianchi8',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel8',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
          {
            relationshipId: 'rel8_2',
            role: 'operatore-sicurezza',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  // use case ACTIVE on 2 product, both logged user is ADMIN: 1 product with 1 role, the other with 2 roles
  {
    id: 'uid9',
    taxCode: 'TAXCOD09A00A123P',
    name: 'Simone9',
    surname: 'Bianchi9',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel6',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel9',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
          {
            relationshipId: 'rel9_2',
            role: 'operatore-sicurezza',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid10',
    taxCode: 'TAXCOD10A00A123P',
    name: 'Simone10',
    surname: 'Bianchi10',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel10',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
          {
            relationshipId: 'rel10_2',
            role: 'operatore-sicurezza',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid11',
    taxCode: 'TAXCOD11A00A123P',
    name: 'Simone11',
    surname: 'Bianchi11',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'PDND',
        id: 'prod-interop',
        roles: [
          {
            relationshipId: 'rel11',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid12',
    taxCode: 'TAXCOD12A00A123P',
    name: 'Simone12',
    surname: 'Bianchi12',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel12',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid13',
    taxCode: 'TAXCOD13A00A123P',
    name: 'Simone13',
    surname: 'Bianchi13',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel13',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid14',
    taxCode: 'TAXCOD14A00A123P',
    name: 'Simone14',
    surname: 'Bianchi14',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel14',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid15',
    taxCode: 'TAXCOD15A00A123P',
    name: 'Simone15',
    surname: 'Bianchi15',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel15',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid16',
    taxCode: 'TAXCOD16A00A123P',
    name: 'Simone16',
    surname: 'Bianchi16',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel16',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid17',
    taxCode: 'TAXCOD17A00A123P',
    name: 'Simone17',
    surname: 'Bianchi17',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'SUSPENDED',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel17',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid18',
    taxCode: 'TAXCOD18A00A123P',
    name: 'Simone18',
    surname: 'Bianchi18',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel18',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid19',
    taxCode: 'TAXCOD19A00A123P',
    name: 'Simone19',
    surname: 'Bianchi19',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel19',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid20',
    taxCode: 'TAXCOD20A00A123P',
    name: 'Simone20',
    surname: 'Bianchi20',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel20',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid21',
    taxCode: 'TAXCOD21A00A123P',
    name: 'Simone21',
    surname: 'Bianchi21',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel21',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid22',
    taxCode: 'TAXCOD22A00A123P',
    name: 'Simone22',
    surname: 'Bianchi22',
    email: 'giuseppe.b@comune.milano.it',
    userRole: 'LIMITED',
    status: 'ACTIVE',
    products: [
      {
        title: 'App IO',
        id: 'prod-io',
        roles: [
          {
            relationshipId: 'rel22',
            role: 'referente-tecnico',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  // Use cases introduced for selfcare PNPG
  {
    id: 'uid60',
    taxCode: 'TAXCOD04A00A121P',
    name: 'Marco',
    surname: 'Marchetti',
    email: 'marco.m@comune.milano.it',
    userRole: 'ADMIN',
    status: 'SUSPENDED',
    products: [
      {
        title: 'SEND',
        id: 'prod-pn-pg',
        roles: [
          {
            relationshipId: 'relTest1',
            role: 'testRole1',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
          {
            relationshipId: 'relTest2',
            role: 'testRole2',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
          {
            relationshipId: 'relTest3',
            role: 'testRole3',
            selcRole: 'LIMITED',
            status: 'SUSPENDED',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid61',
    taxCode: 'TAXCOD04A00A421P',
    name: 'Fabio',
    surname: 'Lopez',
    email: 'fabio.l@comune.milano.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        title: 'SEND',
        id: 'prod-pn-pg',
        roles: [
          {
            relationshipId: 'rel4',
            role: 'Gestore Notifiche',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid62',
    taxCode: 'TAXCOD14A00A521P',
    name: 'Marco',
    surname: 'Marchisio',
    email: 'marco.m@comune.milano.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        title: 'SEND',
        id: 'prod-pn-pg',
        roles: [
          {
            relationshipId: 'rel4',
            role: 'Gestore Notifiche',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
      {
        title: 'SEND coll',
        id: 'prod-pn-pg-coll',
        roles: [
          {
            relationshipId: 'rel4',
            role: 'Gestore Notifiche',
            selcRole: 'LIMITED',
            status: 'ACTIVE',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
  {
    id: 'uid63',
    taxCode: 'DNNGRL83A01C352D',
    name: 'Gabriele',
    surname: 'Rossi',
    email: 'mock@mockpec.com',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    products: [
      {
        id: 'prod-pn-pg',
        title: 'Piattaforma Notifiche Persone Giuridiche',
        roles: [
          {
            relationshipId: 'd83a7eb3-bbb8-4b18-8230-ed74740b4c29',
            role: 'pg-operator',
            status: 'ACTIVE',
            selcRole: 'LIMITED',
          },
        ],
      },
      {
        id: 'prod-pn-pg-uat',
        title: 'PNPG UAT',
        roles: [
          {
            relationshipId: '14be375d-f82e-446b-b7f8-5c2a271315ea',
            role: 'pg-admin',
            status: 'ACTIVE',
            selcRole: 'ADMIN',
          },
        ],
      },
    ],
    isCurrentUser: false,
  },
];

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
    description: 'groupId6 : use case ACTIVE group which does not have a selected product',
    partyId: 'onboarded',
    productId: '',
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
    name: 'Gruppo9',
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
  {
    id: 'groupId14',
    name: 'Gruppo14',
    description: 'Group to have a significant number on prod-io',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['0'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: 'uid',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: 'uid',
  },
  {
    id: 'groupId15',
    name: 'Gruppo15',
    description: 'groupId15 : use case ACTIVE group with loggedUser which is ADMIN in prod-pn-pg',
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
    id: 'groupId16',
    name: 'Gruppo16',
    description: 'groupId16 : use case ACTIVE group with loggedUser which is ADMIN in prod-pn-pg',
    partyId: 'onboarded',
    productId: 'prod-io',
    status: 'ACTIVE',
    membersIds: ['0'],
    createdAt: new Date('2022-01-01'),
    createdByUserId: '0',
    modifiedAt: new Date('2022-01-01 16:00'),
    modifiedByUserId: '0',
  },
].map((o) => ({
  ...o,
  membersCount: o.membersIds.length,
  status: o.status as PartyGroupStatus,
}));

export const mockedUserRegistry: UserRegistry = {
  id: 'id',
  taxCode: 'AAAAAA11A11A234S',
  name: 'franco',
  surname: 'rossi',
  email: 'email@example.com' as EmailString,
  certifiedName: true,
  certifiedSurname: true,
  certifiedMail: true,
};

export const fetchPartyUsers = (
  pageRequest: PageRequest,
  _party: Party,
  _currentUser: User,
  product?: Product,
  selcRole?: UserRole,
  productRoles?: Array<ProductRole>
): Promise<PageResource<PartyUser>> => {
  const filteredContent = mockedUsers
    .filter((u) => {
      const userProductsFilter = product
        ? u.products.filter((p) => p.id === product.id)
        : u.products;
      if (
        selcRole &&
        !userProductsFilter.find((p) => p.roles.find((r) => selcRole === r.selcRole))
      ) {
        return false;
      }
      if (
        productRoles &&
        productRoles.length > 0 &&
        !userProductsFilter.find((p) =>
          p.roles.find((r) => productRoles.map((r) => r.productRole).indexOf(r.role) > -1)
        )
      ) {
        return false;
      }
      if (product && !u.products.find((p) => p.id === product.id)) {
        return false;
      }
      return u;
    })
    .map((u) => {
      const clone = cloneDeep(u) as PartyUser;
      // eslint-disable-next-line functional/immutable-data
      delete (clone as any).taxCode;
      return clone;
    });

  if (pageRequest.sort) {
    applySort(filteredContent, pageRequest.sort);
  }
  return new Promise((resolve) =>
    setTimeout(() => resolve(extractPageRequest(filteredContent, pageRequest)), 100)
  );
};

export const fetchPartyProductUsers = (
  pageRequest: PageRequest,
  party: Party,
  product: Product,
  currentUser: User,
  _productsMap: ProductsMap,
  selcRole?: UserRole,
  productRoles?: Array<ProductRole>
): Promise<PageResource<PartyProductUser>> =>
  fetchPartyUsers(pageRequest, party, currentUser, product, selcRole, productRoles).then(
    (result) => ({
      page: result.page,
      content: result.content.map((u) => {
        const clone: PartyProductUser = {
          ...cloneDeep(u),
          product: u.products.find((p) => p.id === product.id) as PartyUserProduct,
        };
        // eslint-disable-next-line functional/immutable-data
        delete (u as any).products;
        return clone;
      }),
    })
  );

export const savePartyUser = (
  _party: Party,
  product: Product,
  user: PartyUserOnCreation
): Promise<string> => {
  // eslint-disable-next-line functional/immutable-data
  mockedUsers.push({
    id: 'newUserId',
    taxCode: user.taxCode,
    name: user.name,
    surname: user.surname,
    email: user.email,
    userRole: 'ADMIN',
    status: 'ACTIVE',
    isCurrentUser: false,
    products: [
      {
        id: product.id,
        title: product.title,
        roles: user.productRoles.map((r) => ({
          relationshipId: 'relationshipId',
          role: r,
          selcRole: 'ADMIN',
          status: 'ACTIVE',
        })),
      },
    ],
  });
  return new Promise((resolve) => resolve('newUserId'));
};

export const addUserProductRoles = (
  _party: Party,
  _product: Product,
  userId: string,
  _user: PartyUserOnCreation
): Promise<string> => new Promise((resolve) => resolve(userId));

export const updatePartyUser = (_party: Party, user: PartyUserOnEdit): Promise<any> => {
  const userToUpdate = mockedUsers.find((u) => u.id === user.id);
  if (userToUpdate) {
    // eslint-disable-next-line functional/immutable-data
    userToUpdate.name = user.name;
    // eslint-disable-next-line functional/immutable-data
    userToUpdate.surname = user.surname;
    // eslint-disable-next-line functional/immutable-data
    userToUpdate.email = user.email;
  }
  return new Promise((resolve) => resolve(200));
};

export const fetchUserRegistryByFiscalCode = (_taxCode: string): Promise<UserRegistry> =>
  new Promise((resolve) => resolve(mockedUserRegistry));

export const fetchUserRegistryById = (
  partyId: string,
  userId: string
): Promise<UserRegistry | null> =>
  fetchPartyUser(partyId, userId, {
    email: '',
    surname: '',
    taxCode: '',
    uid: '',
    name: '',
  } as User).then((user: PartyUserDetail | null) => ({
    id: user?.id as string,
    taxCode: user?.taxCode as string,
    name: user?.name as string,
    surname: user?.surname as string,
    email: user?.email as EmailString,
    certifiedName: false,
    certifiedSurname: false,
    certifiedMail: false,
  }));

export const fetchPartyUser = (
  _partyId: string,
  userId: string,
  _currentUser: User
): Promise<PartyUserDetail | null> => {
  const mockedUser = mockedUsers.find((u) => u.id === userId) ?? null;
  return new Promise((resolve) =>
    resolve(mockedUser ? JSON.parse(JSON.stringify(mockedUser)) : null)
  );
};

export const updatePartyUserStatus = (
  _party: Party,
  user: BasePartyUser,
  _product: PartyUserProduct,
  role: PartyUserProductRole,
  status: UserStatus
): Promise<any> => {
  const mockedUser = mockedUsers.find((u) => u.id === user.id) as PartyUserDetail;
  if (status === 'ACTIVE' || status === 'SUSPENDED') {
    // eslint-disable-next-line functional/immutable-data
    role.status = status;
    if (user.status !== status) {
      if (status === 'ACTIVE') {
        // eslint-disable-next-line functional/immutable-data
        user.status = 'ACTIVE';
      } else if (!mockedUser.products.find((p) => p.roles.find((r) => r.status === 'ACTIVE'))) {
        // eslint-disable-next-line functional/immutable-data
        user.status = 'SUSPENDED';
      }
    }
    // eslint-disable-next-line functional/immutable-data
    mockedUsers.splice(
      mockedUsers.findIndex((u) => u.id === user.id),
      1,
      { ...mockedUser, ...user }
    );

    return new Promise<void>((resolve) => resolve());
  } else {
    throw new Error(`Not allowed next status: ${status}`);
  }
};

export const deletePartyUser = (
  _party: Party,
  user: BasePartyUser,
  product: PartyUserProduct,
  role: PartyUserProductRole
): Promise<any> => {
  const mockedUser = mockedUsers.find((u) => u.id === user.id) as PartyUserDetail;
  if (mockedUser.products.length === 1 && product.roles.length === 1) {
    // eslint-disable-next-line functional/immutable-data
    mockedUsers.splice(
      mockedUsers.findIndex((u) => u.id === user.id),
      1
    );
  } else {
    // eslint-disable-next-line functional/immutable-data
    product.roles.splice(
      product.roles.findIndex((r) => r.relationshipId === role.relationshipId),
      1
    );
    const mockedUser = mockedUsers.find((u) => u.id === user.id);
    const mockedProductIndex = mockedUser?.products.findIndex((p) => p.id === product.id) ?? -1;
    if (mockedProductIndex > -1) {
      const mockedProduct = mockedUser?.products[mockedProductIndex];
      if (mockedProduct?.roles.length === 1) {
        // eslint-disable-next-line functional/immutable-data
        mockedUser?.products.splice(mockedProductIndex, 1);
      } else {
        const mockedRoleIndex =
          mockedProduct?.roles.findIndex((r) => r.relationshipId === role.relationshipId) ?? -1;
        if (mockedRoleIndex > -1) {
          // eslint-disable-next-line functional/immutable-data
          mockedProduct?.roles.splice(mockedRoleIndex, 1);
        }
      }
    }
  }
  return new Promise<void>((resolve) => resolve());
};

export const fetchUserGroups = (
  party: Party,
  _pageRequest: PageRequest,
  product: Product,
  userId: string
): Promise<Array<PartyGroup>> => {
  const userGroups = mockedGroups.filter(
    (g) =>
      g.partyId === party.partyId && g.productId === product.id && g.membersIds.indexOf(userId) > -1
  );
  return new Promise((resolve) => resolve(userGroups));
};
