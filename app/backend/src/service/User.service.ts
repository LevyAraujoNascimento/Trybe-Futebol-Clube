import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUsersModel } from '../Interfaces/IUsersModel';
import IUser from '../Interfaces/IUsers';

class UserService {
  constructor(
    private userModel: IUsersModel = new UserModel(),
  ) {}

  public async loginCheck(email: string, password: string): Promise<ServiceResponse<IUser | null>> {
    const user = await this.userModel.isAvailable(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }
    return { status: 'SUCCESSFUL', data: user };
  }
}

export default UserService;
