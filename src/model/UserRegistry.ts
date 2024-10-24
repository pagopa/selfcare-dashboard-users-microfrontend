import { SvgIconTypeMap } from '@mui/material';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { EmailString } from '@pagopa/ts-commons/lib/strings';
import { FunctionComponent, SVGProps } from 'react';
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

export type Image = { src: string; alt: string };
export type RequestOutcome = 'success' | 'error';

export type RequestOutcomeMessage = {
  title: string;
  description: Array<JSX.Element>;
  img?: Image;
  ImgComponent?:
    | FunctionComponent<SVGProps<SVGSVGElement>>
    | ((props: DefaultComponentProps<SvgIconTypeMap>) => JSX.Element);
};
export type RequestOutcomeOptions = { [key in RequestOutcome]: RequestOutcomeMessage };
