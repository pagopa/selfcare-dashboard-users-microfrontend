import { UserResource } from '../api/generated/b4f-dashboard/UserResource';

export type UserRegistry = {
  id: string;
  taxCode?: string;
  name?: string;
  surname?: string;
  email?: string;
  certifiedName?: boolean;
  certifiedSurname?: boolean;
  certifiedMail?: boolean;
};

export const userResource2UserRegistry = (resource: UserResource): UserRegistry => ({
  id: resource.id,
  taxCode: resource.fiscalCode,
  name: resource.name?.value,
  surname: resource.familyName?.value,
  email: resource.email?.value,
  certifiedName: resource.name?.certified,
  certifiedSurname: resource.familyName?.certified,
  certifiedMail: resource.email?.certified,
});
