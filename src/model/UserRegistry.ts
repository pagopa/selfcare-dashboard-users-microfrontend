import { UserResource } from '../api/generated/b4f-dashboard/UserResource';

export type UserRegistry = {
  taxCode: string;
  name: string;
  surname: string;
  email: string;
  certification: boolean;
};

export const userResource2UserRegistry = (resource: UserResource): UserRegistry => ({
  taxCode: resource.fiscalCode,
  name: resource.name,
  surname: resource.surname,
  email: resource.email,
  certification: resource.certification,
});
