import { Request, Response } from 'express';
import MatchService from '../service/Match.service';

class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async listAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    let filter;
    if (inProgress === undefined) {
      const matches = await this.matchService.listAllMatches();
      return res.status(200).json(matches.data);
    }
    if (inProgress === 'true') {
      filter = true;
    } else {
      filter = false;
    }
    const matches = await this.matchService.listAllMatchesInProgress(filter);
    return res.status(200).json(matches.data);
  }

  public async updateProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.matchService.updateProgress(Number(id));
    if (result.status === 'NOT_FOUND') {
      return res.status(404).send('Team not found');
    }
    return res.status(200).json({ message: 'Finished' });
  }
}

const matchesController = new MatchController();

export default matchesController;
