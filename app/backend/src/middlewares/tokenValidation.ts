import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../utils/jwt.util';
import UserModel from '../database/models/UserModel';

const validToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userModel = new UserModel();
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json({ message: 'Token not found' });
    return;
  }
  try {
    const decoded = jwtUtil.verify(token as string);
    const user = await userModel.isAvailable(decoded.email);
    if (!user) {
      res.status(401).json({ message: 'Token must be a valid token' });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validToken;
