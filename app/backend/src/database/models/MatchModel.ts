import SequelizeMatch from './SequelizeMatch';
import SequelizeTeam from './SequelizeTeam';
import IMatches from '../../Interfaces/IMatches';
import { IMatchesModel } from '../../Interfaces/IMatchesModel';
// import { NewEntity } from '../../Interfaces/index';

class MatchModel implements IMatchesModel {
  private model = SequelizeMatch;

  async listById(id: number): Promise<IMatches | null> {
    const result = await this.model.findOne(
      {
        where: { id },
        include: [
          { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
          { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
        ] },
    );
    return result;
  }

  async listAll(): Promise<IMatches[] | null> {
    const result = await this.model.findAll(
      { include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ] },
    );
    return result;
  }

  async listAllInProgress(inProgress: boolean): Promise<IMatches[] | null> {
    const result = await this.model.findAll(
      {
        where: { inProgress },
        include: [
          { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
          { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
        ] },
    );
    return result;
  }

  async updateProgress(id: number): Promise<boolean | null> {
    const [affectedCount] = await this.model.update({ inProgress: false }, { where: { id } });
    if (affectedCount === 0) return false;
    return true;
  }

  async updateScore(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<boolean | null> {
    const [affectedCount] = await this.model.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });

    if (affectedCount === 0) return false;
    return true;
  }

  async createMatch(body: IMatches): Promise<IMatches | null> {
    let id = body.homeTeamId;
    const testA = await this.listById(id);
    if (!testA) return testA;
    id = body.awayTeamId;
    const testB = await this.listById(id);
    if (!testB) return testB;
    const result = await this.model.create({ ...body, inProgress: true });
    return result;
  }
}

export default MatchModel;
