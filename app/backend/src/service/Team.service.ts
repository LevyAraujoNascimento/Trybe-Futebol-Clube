import TeamModel from '../database/models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import ITeams from '../Interfaces/ITeams';

class TeamService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
  ) {}

  public async listAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamModel.listAll();
    if (!teams) {
      return { status: 'NOT_FOUND', data: { message: 'Teams not found' } };
    }
    return { status: 'SUCCESSFUL', data: teams };
  }
}

export default TeamService;
