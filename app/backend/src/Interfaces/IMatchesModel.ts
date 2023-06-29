import IMatches from './IMatches';

export interface IMatchesModel {
  listAll(): Promise<IMatches[] | null>;
  listAllInProgress(inProgress: boolean): Promise<IMatches[] | null>;
  updateProgress(id: number): Promise<boolean | null>;
  updateScore(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<boolean | null>;
}
