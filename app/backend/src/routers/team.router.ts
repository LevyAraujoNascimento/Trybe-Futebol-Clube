import { Request, Router, Response } from 'express';
import controller from '../controllers/index';

const teamRouter = Router();

teamRouter.get(
  '/',
  (req: Request, res: Response) => controller.teamController.listAllTeams(req, res),
);

teamRouter.get(
  '/:id',
  (req: Request, res: Response) => controller.teamController.listOneTeam(req, res),
);

export default teamRouter;
