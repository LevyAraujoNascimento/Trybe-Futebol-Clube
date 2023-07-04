import ILeaderBoard from '../Interfaces/ILeaderBoard';
import IMatches from '../Interfaces/IMatches';
import ITeams from '../Interfaces/ITeams';
import { teamSort } from './boardResponse.util';

const board = (teams: ITeams[], matches: IMatches[]): ILeaderBoard[] => teams.map((club) => {
  const g = matches?.filter((element) => element.awayTeamId === club.id);
  const wins = g.filter((e) => (e.awayTeamId === club.id && e.awayTeamGoals > e.homeTeamGoals));
  const draws = g.filter((game) => (game.homeTeamGoals === game.awayTeamGoals));
  const goalsFavor = g.map((awayClub) => awayClub.awayTeamGoals);
  const goalsOwn = g.map((homeClub) => homeClub.homeTeamGoals);
  return {
    name: club.teamName,
    totalPoints: (wins.length * 3) + (draws.length),
    totalGames: g.length,
    totalVictories: wins.length,
    totalDraws: draws.length,
    totalLosses: (g.length - (wins.length + draws.length)),
    goalsFavor: goalsFavor.reduce((acc, cur) => acc + cur, 0),
    goalsOwn: goalsOwn.reduce((acc, cur) => acc + cur, 0),
  };
});

const awayBoard = (teams: ITeams[], matches: IMatches[]): ILeaderBoard[] => {
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

export default awayBoard;
