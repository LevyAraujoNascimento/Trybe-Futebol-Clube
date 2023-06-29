import { Request, Router, Response } from 'express';
import controller from '../controllers/index';
import validLogin from '../middlewares/loginValidation';
import validToken from '../middlewares/tokenValidation';

const userRouter = Router();

userRouter.post(
  '/',
  validLogin,
  (req: Request, res: Response) => controller.usersController.login(req, res),
);

userRouter.get(
  '/role',
  validToken,
  (req: Request, res: Response) => controller.usersController.role(req, res),
);

export default userRouter;
