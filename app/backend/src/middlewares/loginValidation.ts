// import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

const validLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const passwordLimit = 6;
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: 'All fields must be filled' });
    return;
  }
  if (!regex.test(email)) {
    res.status(400).send({ message: '"email" must be a valid email' });
    return;
  }
  if (password.length <= passwordLimit) {
    res.status(400).send({ message: '"password" must be a valid password' });
    return;
  }
  next();
};

export default validLogin;
