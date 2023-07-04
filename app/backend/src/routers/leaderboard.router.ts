import { Request, Router, Response } from 'express';
import controller from '../controllers/index';

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response) => controller.leaderBoardController.showHomeBoard(req, res),
);

leaderBoardRouter.get(
  '/away',
  (req: Request, res: Response) => controller.leaderBoardController.showAwayBoard(req, res),
);

leaderBoardRouter.get(
  '/',
  (req: Request, res: Response) => controller.leaderBoardController.showMainBoard(req, res),
);

export default leaderBoardRouter;
