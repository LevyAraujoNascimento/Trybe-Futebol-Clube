import { Request, Response } from 'express';
import LeaderBoardService from '../service/LeaderBoard.service';

class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) {}

  public async listAllTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await this.leaderBoardService.listAllTeams();
    return res.status(200).json(teams.data);
  }

  public async showHomeBoard(_req: Request, res: Response): Promise<Response> {
    const matches = await this.leaderBoardService.showHomeBoard(false);
    return res.status(200).json(matches.data);
  }

  public async showAwayBoard(_req: Request, res: Response): Promise<Response> {
    const matches = await this.leaderBoardService.showAwayBoard(false);
    return res.status(200).json(matches.data);
  }
}

const leaderBoardController = new LeaderBoardController();

export default leaderBoardController;
