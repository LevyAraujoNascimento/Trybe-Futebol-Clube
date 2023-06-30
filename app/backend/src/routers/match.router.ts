import { Request, Router, Response } from 'express';
import controller from '../controllers/index';
import validToken from '../middlewares/tokenValidation';

const matchRouter = Router();

matchRouter.get(
  '/',
  (req: Request, res: Response) => controller.matchesController.listAllMatches(req, res),
);

matchRouter.patch(
  '/:id',
  validToken,
  (req: Request, res: Response) => controller.matchesController.updateScore(req, res),
);

matchRouter.patch(
  '/:id/finish',
  validToken,
  (req: Request, res: Response) => controller.matchesController.updateProgress(req, res),
);

matchRouter.post(
  '/',
  validToken,
  (req: Request, res: Response) => controller.matchesController.createMatch(req, res),
);

export default matchRouter;
