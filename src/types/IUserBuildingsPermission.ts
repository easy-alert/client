import type { IUser } from './IUser';

export interface IUserBuildingsPermission {
  name: any;
  id?: string;

  userId?: string;
  buildingId?: string;

  showContact?: boolean;
  isMainContact?: boolean;

  User?: IUser;

  createdAt?: Date;
  updatedAt?: Date;
}
