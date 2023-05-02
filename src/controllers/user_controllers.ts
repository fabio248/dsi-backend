import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../db/entity/User';

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) res.status(400).send(`Invalid Credentials`);

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new User();
    user.email = email;
    user.password = hashPassword;

    console.log(user);

    // user.save();
    if (user != null) {
      res.status(200).json({
        msg: 'Registered User',
        email: email,
        password: hashPassword,
      });
    } else {
      throw res.status(400).send({ msg: 'Has been a error' });
    }
  } catch (error) {
    next(error);
  }
};

export { registerUser };
