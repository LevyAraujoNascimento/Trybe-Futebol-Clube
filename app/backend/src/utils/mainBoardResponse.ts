import ILeaderBoard from '../Interfaces/ILeaderBoard';
import IMatches from '../Interfaces/IMatches';
import ITeams from '../Interfaces/ITeams';
import homeBoard, { teamSort } from './boardResponse.util';
import awayBoard from './awayBoardResponse';

const board = (teams: ITeams[], matches: IMatches[]): ILeaderBoard[] => {
  const away = awayBoard(teams, matches);
  const home = homeBoard(teams, matches);
  return home.map((ida) => {
    const [volta] = away.filter((team) => ida.name === team.name);
    return {
      name: ida.name,
      totalPoints: ida.totalPoints + volta.totalPoints,
      totalGames: ida.totalGames + volta.totalGames,
      totalVictories: ida.totalVictories + volta.totalVictories,
      totalDraws: ida.totalDraws + volta.totalDraws,
      totalLosses: ida.totalLosses + volta.totalLosses,
      goalsFavor: ida.goalsFavor + volta.goalsFavor,
      goalsOwn: ida.goalsOwn + volta.goalsOwn,
    };
  });
};

const mainBoard = (teams: ITeams[], matches: IMatches[]): ILeaderBoard[] => {
  const response = board(teams, matches);
  const result = response.map((element) => {
    const efficiency = ((element.totalPoints / (element.totalGames * 3)) * 100).toFixed(2);
    return {
      ...element,
      goalsBalance: element.goalsFavor - element.goalsOwn,
      efficiency,
    };
  });
  return result.sort((a, b) => teamSort(a, b));
};

export default mainBoard;
