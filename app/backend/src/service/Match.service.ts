import MatchModel from '../database/models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatches from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';

class MatchService {
  constructor(
    private matchModel: IMatchesModel = new MatchModel(),
  ) {}

  public async listAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchModel.listAll();
    if (!matches) {
      return { status: 'NOT_FOUND', data: { message: 'Matches not found' } };
    }
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async listAllMatchesInProgress(inProgress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchModel.listAllInProgress(inProgress);
    if (!matches) {
      return { status: 'NOT_FOUND', data: { message: 'Matches not found' } };
    }
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async updateProgress(id: number): Promise<ServiceResponse<boolean>> {
    const result = await this.matchModel.updateProgress(id);
    if (result === false) {
      return { status: 'NOT_FOUND', data: { message: 'Match not changed' } };
    }
    return { status: 'SUCCESSFUL', data: true };
  }

  public async updateScore(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<boolean>> {
    const result = await this.matchModel.updateScore(id, homeTeamGoals, awayTeamGoals);
    if (result === false) {
      return { status: 'NOT_FOUND', data: { message: 'Match not changed' } };
    }
    return { status: 'SUCCESSFUL', data: true };
  }
}

export default MatchService;
