import IMatches from './IMatches';

export interface IMatchesModel {
  listAll(): Promise<IMatches[] | null>;
}
