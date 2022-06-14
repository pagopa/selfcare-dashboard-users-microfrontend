import { UserResource } from '../api/generated/b4f-dashboard/UserResource';

export type UserRegistry = {
  id: string;
  taxCode: string;
  name: string;
  surname: string;
  email: string;
  certifiedName: boolean;
  certifiedSurname: boolean;
  certifiedMail: boolean;
};

export const userResource2UserRegistry = (resource: UserResource): UserRegistry => ({
  id: resource.id,
  taxCode: resource.fiscalCode,
  name: resource.name ? resource.name?.value : '',
  surname: resource.familyName ? resource.familyName?.value : '',
  email: resource.email ? resource.email?.value : '',
  certifiedName: resource.name ? resource.name?.certified : false,
  certifiedSurname: resource.familyName ? resource.familyName?.certified : false,
  certifiedMail: resource.email ? resource.email?.certified : false,
});
