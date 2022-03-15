import { PartyUser } from './PartyUser';

export type PartyGroupStatus = 'ACTIVE' | 'SUSPENDED';

export type PartyGroup = {
  id: string;
  institutionId: string;
  productId: string;
  name: string;
  description: string;
  status: PartyGroupStatus;
  membersIds: Array<string>;
  createdAt: Date;
  createdByUserId: string;
  modifiedAt: Date;
  modifiedByUserId: string;
};

export type PartyGroupExt = PartyGroup & {
  members: Array<PartyUser>;
  createdBy: PartyUser;
  modifiedBy: PartyUser;
};

export type PartyGroupOnCreation = {
  institutionId: string;
  productId: string;
  name: string;
  description: string;
  members: Array<PartyUser>;
};

export type PartyGroupOnEdit = {
  id: string;
  institutionId: string;
  productId: string;
  name: string;
  description: string;
  members: Array<PartyUser>;
};
