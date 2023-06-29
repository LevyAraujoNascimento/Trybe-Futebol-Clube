import { Request, Response } from 'express';
import MatchService from '../service/Match.service';

class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async listAllMatches(_req: Request, res: Response): Promise<Response> {
    const matches = await this.matchService.listAllMatches();
    return res.status(200).json(matches.data);
  }
}

const matchesController = new MatchController();

export default matchesController;
