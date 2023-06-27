import { Request, Response } from 'express';
import TeamService from '../service/Team.service';

class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async listAllTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamService.listAllTeams();
    return res.status(200).send(teams.data);
  }
}

const teamsController = new TeamController();

export default teamsController;
