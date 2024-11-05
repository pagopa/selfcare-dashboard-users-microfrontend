import { GeographicTaxonomyResource } from '../api/generated/b4f-dashboard/GeographicTaxonomyResource';
import { ProductOnBoardingStatusEnum } from '../api/generated/b4f-dashboard/OnboardedProductResource';

export type UserRole = 'ADMIN' | 'LIMITED' | 'ADMIN_EA';
export type PartyRole = 'DELEGATE' | 'MANAGER' | 'OPERATOR' | 'SUB_DELEGATE' | 'ADMIN_EA';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'TOBEVALIDATED';
export type UserRoleFilters = 'ADMIN' | 'LIMITED';

export type BaseParty = {
  partyId: string;
  description: string;
  status: UserStatus;
  userRole: UserRole;
  urlLogo?: string;
  parentDescription?: string;
};

type OnboardedProduct = {
  authorized?: boolean;
  billing?: {
      publicServices?: boolean;
      recipientCode?: string;
      vatNumber?: string;
  };
  productId?: string;
  productOnBoardingStatus?: ProductOnBoardingStatusEnum;
  userProductActions?: Array<string>;
  userRole?: string;
  isAggregator?: boolean;
};

export type Party = {
  partyId: string;
  products: Array<OnboardedProduct>;
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
