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
}

export default MatchService;
