import { Request, Response } from 'express';
import UserService from '../service/User.service';
import jwtUtil from '../utils/jwt.util';

class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const result = await this.userService.loginCheck(email, password);
    if (result.status === 'NOT_FOUND') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwtUtil.sign(req.body);
    return res.status(200).json({ token });
  }
}

const usersController = new UserController();

export default usersController;
