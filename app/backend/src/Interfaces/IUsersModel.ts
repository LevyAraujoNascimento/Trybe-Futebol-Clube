import IUser from './IUsers';

export interface IUsersModel {
  isAvailable(email: string): Promise<IUser | null>;
}
