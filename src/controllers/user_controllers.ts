import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';

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
    const { id } = req.params;
    const userObtained = await userService.getUserById(+id);

    res.status(200).send({ data: userObtained });
  } catch (error) {
    next(error);
  }
};

//funcion para eliminar un usuario en base a su email
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(+id);
    res.status(200).send({ message: `deleted user with id: ${id}` });
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
    const { id } = req.params;
    const newData = req.body;
    const userUpdated = await userService.updateUser(+id, newData);
    res
      .status(200)
      .send({ message: 'User updated successfully', data: userUpdated });
  } catch (error) {
    next(error);
  }
};

const saveGoogleData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send('google data online');
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
  saveGoogleData,
};
