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
}

export default TeamModel;
