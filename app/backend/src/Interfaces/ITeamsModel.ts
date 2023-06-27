import ITeams from './ITeams';

export interface ITeamsModel {
  listAll(): Promise<ITeams[]>;
  listOne(id: ITeams['id']): Promise<ITeams | null>;
}
