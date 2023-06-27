import SequelizeTeam from './SequelizeTeam';
import ITeams from '../../Interfaces/ITeams';
import { ITeamsModel } from '../../Interfaces/ITeamsModel';
// import { NewEntity } from '../../Interfaces/index';

class TeamModel implements ITeamsModel {
  private model = SequelizeTeam;

  async listAll(): Promise<ITeams[]> {
    const result = await this.model.findAll();
    return result;
  }

  async listOne(id: ITeams['id']): Promise<ITeams | null> {
    const result = await this.model.findByPk(id);
    return result;
  }
}

export default TeamModel;
