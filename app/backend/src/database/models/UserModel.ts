import SequelizeUser from './SequelizeUser';
import IUser from '../../Interfaces/IUsers';
import { IUsersModel } from '../../Interfaces/IUsersModel';
// import { NewEntity } from '../../Interfaces/index';

class UserModel implements IUsersModel {
  private model = SequelizeUser;

  async isAvailable(email: string): Promise<IUser | null> {
    const result = await this.model.findOne({ where: { email } });
    return result;
  }
}

export default UserModel;
