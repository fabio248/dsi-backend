import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';
import { petService } from '../utils/dependencies/dependencies';

const userService = new UserService();

//registra un nuevo usuario en la DB
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user = await userService.create(data);

    return res.status(201).json({
      message: 'Created user successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

//Obtiene un usuario en base al email
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const userObtained = await userService.getUserById(+userId);

    res.status(200).send({ data: userObtained });
  } catch (error) {
    next(error);
  }
};

//funcion para eliminar un usuario en base a su email
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    await userService.deleteUser(+userId);
    res.status(200).send({ message: `deleted user with id: ${userId}` });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json({ data: allUsers });
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const newData = req.body;
    const userUpdated = await userService.updateUser(+userId, newData);
    res
      .status(200)
      .send({ message: 'User updated successfully', data: userUpdated });
  } catch (error) {
    next(error);
  }
};

const sendEmailCalendar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const response = await userService.sendEmailEventCalendar(email);
    res
      .status(200)
      .json({ Confirmated: 'email send successfully', message: response });
  } catch (error) {
    next(error);
  }
};

export const createUserWithPet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const input = req.body;
    const { inputPet } = input;
    const user = await userService.create({
      ...input,
      pet: undefined,
    });
    const pet = await petService.create(inputPet, user.id);

    res.status(201).json({ message: 'entities created', data: { user, pet } });
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  getUser,
  deleteUser,
  getAllUsers,
  updateUser,
  sendEmailCalendar,
};
