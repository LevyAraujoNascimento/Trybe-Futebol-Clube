import { Request, Router, Response } from 'express';
import controller from '../controllers/index';

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response) => controller.leaderBoardController.showHomeBoard(req, res),
);

export default leaderBoardRouter;
