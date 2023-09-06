import { EmailString } from '@pagopa/ts-commons/lib/strings';
import { UserResource } from '../api/generated/b4f-dashboard/UserResource';

export type UserRegistry = {
  id: string;
  taxCode: string;
  name: string;
  surname: string;
  email: EmailString;
  certifiedName: boolean;
  certifiedSurname: boolean;
  certifiedMail: boolean;
};

export const userResource2UserRegistry = (resource: UserResource): UserRegistry => ({
  id: resource.id ?? '',
  taxCode: resource.fiscalCode ?? '',
  name: resource.name?.value ?? '',
  surname: resource.familyName?.value ?? '',
  email: (resource.email ? resource.email?.value : '') as EmailString,
  certifiedName: resource.name?.certified ?? false,
  certifiedSurname: resource.familyName?.certified ?? false,
  certifiedMail: resource.email?.certified ?? false,
});
