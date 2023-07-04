import ILeaderBoard from '../Interfaces/ILeaderBoard';
import IMatches from '../Interfaces/IMatches';
import ITeams from '../Interfaces/ITeams';

const board = (teams: ITeams[], matches: IMatches[]): ILeaderBoard[] => teams.map((club) => {
  const g = matches?.filter((element) => element.homeTeamId === club.id);
  const wins = g.filter((e) => (e.homeTeamId === club.id && e.homeTeamGoals > e.awayTeamGoals));
  const draws = g.filter((game) => (game.homeTeamGoals === game.awayTeamGoals));
  const goalsFavor = g.map((homeClub) => homeClub.homeTeamGoals);
  const goalsOwn = g.map((awayClub) => awayClub.awayTeamGoals);
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

const teamSort = (a: ILeaderBoard, b: ILeaderBoard): number => {
  if (a.totalPoints === b.totalPoints) {
    if (a.totalVictories === b.totalVictories) {
      if (a.goalsBalance === b.goalsBalance) {
        if (a.goalsFavor === b.goalsFavor) {
          return 1;
        }
        return b.goalsFavor - a.goalsFavor;
      }
      return (b.goalsBalance as number) - (a.goalsBalance as number);
    }
    return b.totalVictories - a.totalVictories;
  }
  return b.totalPoints - a.totalPoints;
};

const homeBoard = (teams: ITeams[], matches: IMatches[]): ILeaderBoard[] => {
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

export default homeBoard;
