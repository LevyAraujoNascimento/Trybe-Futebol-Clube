import { Request, Router, Response } from 'express';
import controller from '../controllers/index';

const matchRouter = Router();

matchRouter.get(
  '/',
  (req: Request, res: Response) => controller.matchesController.listAllMatches(req, res),
);

export default matchRouter;
