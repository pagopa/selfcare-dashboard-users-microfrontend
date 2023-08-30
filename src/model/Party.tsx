import { GeographicTaxonomyResource } from '../api/generated/b4f-dashboard/GeographicTaxonomyResource';
import { OnboardedProductResource } from '../api/generated/b4f-dashboard/OnboardedProductResource';

export type UserRole = 'ADMIN' | 'LIMITED';
export type PartyRole = 'DELEGATE' | 'MANAGER' | 'OPERATOR' | 'SUB_DELEGATE';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'TOBEVALIDATED';

export type BaseParty = {
  partyId: string;
  description: string;
  status: UserStatus;
  userRole: UserRole;
  urlLogo?: string;
  parentDescription?: string;
};

export type Party = {
  partyId: string;
  products: Array<OnboardedProductResource>;
  externalId?: string;
  originId?: string;
  origin?: string;
  description: string;
  digitalAddress?: string;
  category?: string;
  urlLogo?: string;
  fiscalCode?: string;
  registeredOffice: string;
  zipCode: string;
  typology: string;
  institutionType?: string;
  recipientCode?: string;
  geographicTaxonomies: Array<GeographicTaxonomyResource>;
  vatNumberGroup?: boolean;
  supportEmail?: string;
  vatNumber?: string;
  subunitCode?: string;
  subunitType?: string;
  aooParentCode?: string;
  parentDescription?: string;
  userRole?: UserRole;
  status?: UserStatus;
};
