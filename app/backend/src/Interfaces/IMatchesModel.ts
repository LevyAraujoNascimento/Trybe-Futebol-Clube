import IMatches from './IMatches';

export interface IMatchesModel {
  listAll(): Promise<IMatches[] | null>;
  listAllInProgress(inProgress: boolean): Promise<IMatches[] | null>;
  updateProgress(id: number): Promise<boolean | null>;
}
