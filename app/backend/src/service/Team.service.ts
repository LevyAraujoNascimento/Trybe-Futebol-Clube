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

  public async listOneTeam(id: number): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.teamModel.listOne(id);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}

export default TeamService;
