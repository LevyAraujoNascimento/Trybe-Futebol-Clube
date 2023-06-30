import { Request, Response } from 'express';
import MatchService from '../service/Match.service';

const MATCH_NOT_FOUND = 'Match not found';
const ITS_NOT_POSSIBLE = 'It is not possible to create a match with two equal teams';

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
      return res.status(404).send(MATCH_NOT_FOUND);
    }
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateScore(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this.matchService.updateScore(Number(id), homeTeamGoals, awayTeamGoals);
    if (result.status === 'NOT_FOUND') {
      return res.status(404).send(MATCH_NOT_FOUND);
    }
    return res.status(200).json({ message: 'Finished' });
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({ message: ITS_NOT_POSSIBLE });
    }
    const result = await this.matchService.createMatch(req.body);
    if (result.status === 'NOT_FOUND') {
      return res.status(404).json({ message: result.data.message });
    }
    return res.status(201).json(result.data);
  }
}

const matchesController = new MatchController();

export default matchesController;
