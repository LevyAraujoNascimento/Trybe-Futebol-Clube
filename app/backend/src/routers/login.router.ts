import { Request, Router, Response } from 'express';
import controller from '../controllers/index';
import validLogin from '../middlewares/loginValidation';

const userRouter = Router();

userRouter.post(
  '/',
  validLogin,
  (req: Request, res: Response) => controller.usersController.login(req, res),
);

export default userRouter;
