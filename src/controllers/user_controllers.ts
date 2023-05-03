import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';

const userService = new UserService();

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user = await userService.create(data);

    return res.status(200).json({
      message: 'Created user successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser };
