import ITeams from './ITeams';

export interface ITeamsModel {
  listAll(): Promise<ITeams[]>;
}
