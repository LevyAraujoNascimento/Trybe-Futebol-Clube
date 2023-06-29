import SequelizeMatch from './SequelizeMatch';
import SequelizeTeam from './SequelizeTeam';
import IMatches from '../../Interfaces/IMatches';
import { IMatchesModel } from '../../Interfaces/IMatchesModel';
// import { NewEntity } from '../../Interfaces/index';

class MatchModel implements IMatchesModel {
  private model = SequelizeMatch;

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
}

export default MatchModel;
