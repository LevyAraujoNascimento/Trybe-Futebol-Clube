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

export default board;
