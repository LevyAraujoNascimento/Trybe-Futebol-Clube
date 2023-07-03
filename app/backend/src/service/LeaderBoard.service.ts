import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import ITeams from '../Interfaces/ITeams';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import ILeaderBoard from '../Interfaces/ILeaderBoard';
import board from '../utils/boardResponse.util';

class LeaderBoardService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
    private matchModel: IMatchesModel = new MatchModel(),
  ) {}

  public async listAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamModel.listAll();
    if (!teams) {
      return { status: 'NOT_FOUND', data: { message: 'Teams not found' } };
    }
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async showHomeBoard(inProgress: boolean): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matchModel.listAllInProgress(inProgress);
    const teams = await this.teamModel.listAll();
    if (!matches) return { status: 'NOT_FOUND', data: { message: 'Matches not found' } };
    const leaderboard = board(teams, matches);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}

export default LeaderBoardService;
