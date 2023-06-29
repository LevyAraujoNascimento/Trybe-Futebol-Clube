import { Router } from 'express';
import teamRouter from './team.router';
import userRouter from './login.router';
import matchRouter from './match.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
