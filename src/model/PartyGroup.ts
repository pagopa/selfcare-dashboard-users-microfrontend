import { UserGroupPlainResource } from '../api/generated/b4f-dashboard/UserGroupPlainResource';

export type PartyGroupStatus = 'ACTIVE' | 'SUSPENDED';

export type PartyGroup = {
  id: string;
  institutionId: string;
  productId: string;
  name: string;
  description: string;
  status: PartyGroupStatus;
  membersCount: number;
  createdAt?: Date;
  modifiedAt?: Date;
};

export const usersGroupPlainResource2PartyGroup = (
  resource: UserGroupPlainResource
): PartyGroup => ({
  id: resource.id,
  institutionId: resource.institutionId,
  productId: resource.productId,
  name: resource.name,
  description: resource.description,
  status: resource.status,
  membersCount: resource.membersCount,
  createdAt: resource.createdAt,
  modifiedAt: resource.modifiedAt,
});
