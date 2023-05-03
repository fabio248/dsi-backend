import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';

function login(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).send("It's Ok");
  } catch (error) {
    throw res.status(400).send(error);
  }
}

export { login };
