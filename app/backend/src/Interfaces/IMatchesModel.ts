import IMatches from './IMatches';

export interface IMatchesModel {
  listById(id: number): Promise<IMatches | null>;
  listAll(): Promise<IMatches[] | null>;
  listAllInProgress(inProgress: boolean): Promise<IMatches[] | null>;
  updateProgress(id: number): Promise<boolean | null>;
  updateScore(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<boolean | null>;
  createMatch(body: IMatches): Promise<IMatches | null>;
}
