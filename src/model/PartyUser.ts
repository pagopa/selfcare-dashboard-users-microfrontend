import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { EmailString } from '@pagopa/ts-commons/lib/strings';
import { InstitutionUserDetailsResource } from '../api/generated/b4f-dashboard/InstitutionUserDetailsResource';
import { ProductInfoResource } from '../api/generated/b4f-dashboard/ProductInfoResource';
import { ProductUserResource } from '../api/generated/b4f-dashboard/ProductUserResource';
import { PartyRole, UserRole, UserRoleFilters, UserStatus } from './Party';
import { Product, ProductsMap } from './Product';

export type BasePartyUser = {
  id: string;
  name: string;
  surname: string;
  email: string;
  userRole: UserRole;
  status: UserStatus;
  isCurrentUser: boolean;
};

export type PartyProductUser = BasePartyUser & {
  product: PartyUserProduct;
};

export type PartyUser = BasePartyUser & {
  products: Array<PartyUserProduct>;
};

export type PartyUserDetail = PartyUser & {
  taxCode: string;
};

export type PartyUserProduct = {
  id: string;
  title: string;
  roles: Array<PartyUserProductRole>;
};

export type PartyUserProductRole = {
  relationshipId: string;
  role: string;
  selcRole: UserRoleFilters;
  status: UserStatus;
};

export type PartyUserOnCreation = {
  name: string;
  surname: string;
  taxCode: string;
  email: string;
  confirmEmail: string;
  productRoles: Array<string>;
  certifiedName: boolean;
  certifiedSurname: boolean;
  certifiedMail: boolean;
};

export type PartyUserLR = {
  taxCode: string;
  name: string;
  surname: string;
  email: string;
};

export type OnboardingUserData = {
  name: string;
  surname: string;
  taxCode: string;
  from?: string; 
  email: string;
  role: PartyRole;
};

export type TextTransform = 'uppercase' | 'lowercase';

export type PartyUserOnEdit = {
  id: string;
  taxCode: string;
  name: string;
  surname: string;
  email: EmailString;
  confirmEmail: string;
  certifiedName: boolean;
  certifiedSurname: boolean;
  certifiedMail: boolean;
};

export const institutionUserResource2PartyUser = (
  resource: InstitutionUserDetailsResource,
  productsMap: ProductsMap,
  currentUser: User
): PartyUser => ({
  id: resource.id ?? '',
  name: resource.name ?? '',
  surname: resource.surname ?? '',
  email: resource?.email as EmailString,
  userRole: resource.role as UserRole,
  products: resource.products
    ? ([] as Array<PartyUserProduct>).concat(
        resource.products.map((p) =>
          productInfoResource2PartyUserProduct(p, productsMap[p.id as string])
        )
      )
    : [],
  status: resource.status as UserStatus,
  isCurrentUser: currentUser.uid === resource.id,
});

export const institutionUserResource2PartyUserDetail = (
  resource: InstitutionUserDetailsResource,
  productsMap: ProductsMap,
  currentUser: User
): PartyUserDetail => ({
  id: resource.id ?? '',
  taxCode: resource.fiscalCode ?? '',
  name: resource.name ?? '',
  surname: resource.surname ?? '',
  email: resource?.email as EmailString,
  userRole: resource.role as UserRole,
  products: resource.products
    ? ([] as Array<PartyUserProduct>).concat(
        resource.products.map((p) =>
          productInfoResource2PartyUserProduct(p, productsMap[p.id as string])
        )
      )
    : [],
  status: resource.status as UserStatus,
  isCurrentUser: currentUser.uid === resource.id,
});

export const productInfoResource2PartyUserProduct = (
  productInfo: ProductInfoResource,
  product: Product
): PartyUserProduct => ({
  id: productInfo.id ?? '',
  title: productInfo.title ?? product.title,
  roles: productInfo.roleInfos?.map((r) => ({
    relationshipId: r.relationshipId,
    role: r.role,
    selcRole: r.selcRole as UserRole,
    status: r.status as UserStatus,
  })) as Array<PartyUserProductRole>,
});

export const productUserResource2PartyProductUser = (
  resource: ProductUserResource,
  product: Product,
  currentUser: User
): PartyProductUser => ({
  id: resource.id ?? '',
  name: resource.name ?? '',
  surname: resource.surname ?? '',
  email: resource?.email as EmailString,
  userRole: resource.role as UserRole,
  product: productInfoResource2PartyUserProduct(resource.product as ProductInfoResource, product),
  status: resource.status as UserStatus,
  isCurrentUser: currentUser.uid === resource.id,
});

export const partyUserDetail2User = (partyUserDetail: PartyUserDetail): User => ({
  uid: partyUserDetail.id ?? '',
  taxCode: partyUserDetail.taxCode,
  name: partyUserDetail.name ?? '',
  surname: partyUserDetail.surname ?? '',
  email: partyUserDetail.email as EmailString,
});

export const checkSuspendedUser = (partyUser: PartyUser): boolean =>
  partyUser.products.every((p) => p.roles.every((r) => r.status === 'SUSPENDED'));
