import { Request, Response } from 'express';
import TeamService from '../service/Team.service';

class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async listAllTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamService.listAllTeams();
    return res.status(200).json(teams.data);
  }

  public async listOneTeam(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this.teamService.listOneTeam(Number(id));
    if (team.status === 'NOT_FOUND') {
      return res.status(404).send('Team not found');
    }
    return res.status(200).json(team.data);
  }
}

const teamsController = new TeamController();

export default teamsController;
