import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import ITeams from '../Interfaces/ITeams';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import ILeaderBoard from '../Interfaces/ILeaderBoard';
import homeBoard from '../utils/boardResponse.util';
import awayBoard from '../utils/awayBoardResponse';
import mainBoard from '../utils/mainBoardResponse';

const NOT_FOUND = 'NOT_FOUND';
const SUCCESSFUL = 'SUCCESSFUL';
const MATCHES_NOT_FOUND = 'Matches not found';

class LeaderBoardService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
    private matchModel: IMatchesModel = new MatchModel(),
  ) {}

  public async listAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamModel.listAll();
    if (!teams) {
      return { status: NOT_FOUND, data: { message: 'Teams not found' } };
    }
    return { status: SUCCESSFUL, data: teams };
  }

  public async showHomeBoard(inProgress: boolean): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matchModel.listAllInProgress(inProgress);
    const teams = await this.teamModel.listAll();
    if (!matches) return { status: NOT_FOUND, data: { message: MATCHES_NOT_FOUND } };
    const leaderboard = homeBoard(teams, matches);
    return { status: SUCCESSFUL, data: leaderboard };
  }

  public async showAwayBoard(inProgress: boolean): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matchModel.listAllInProgress(inProgress);
    const teams = await this.teamModel.listAll();
    if (!matches) return { status: NOT_FOUND, data: { message: MATCHES_NOT_FOUND } };
    const leaderboard = awayBoard(teams, matches);
    return { status: SUCCESSFUL, data: leaderboard };
  }

  public async showMainBoard(inProgress: boolean): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matchModel.listAllInProgress(inProgress);
    const teams = await this.teamModel.listAll();
    if (!matches) return { status: NOT_FOUND, data: { message: MATCHES_NOT_FOUND } };
    const leaderboard = mainBoard(teams, matches);
    return { status: SUCCESSFUL, data: leaderboard };
  }
}

export default LeaderBoardService;
