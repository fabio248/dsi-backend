import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';
import bcrypt from 'bcryptjs';

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

    return res.status(200).json({
      message: 'Created user successfully',
      user,
    });
  } catch (error) {
    res.status(500).send('Has been a error, please try again!');
    next(error);
  }
};

//Obtiene un usuario en base al email
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const userObtained = await userService.getUser(email);

    res.status(200).send({ Usuario: userObtained });
  } catch (error) {
    res.status(500).send('Has been a error, please try again!');
    next(error);
  }
};

//funcion para eliminar un usuario en base a su email
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    await userService.deleteUser(email);
    res.status(200).send({ message: 'deleted user' });
  } catch (error) {
    res.status(500).send('Has been a error, please try again!');
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json({ Users: allUsers });
  } catch (error) {
    res.status(500).send('Has been a error, please try again!');
    next(error);
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    if (newData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(newData.password, salt);

      newData.password = hashPassword;
    } else {
      delete newData.password;
    }
    const userObtained = await userService.updateUser(id, newData);
    //es un test para verificar que los datos se han actualizado
    //user: userObteined no debe existir en la etapa final
    res
      .status(200)
      .send({ msg: 'User updated successfully', user: userObtained });
  } catch (error) {
    res.status(500).send('Has been a error, please try again!');
    next(error);
  }
};

export { registerUser, getUser, deleteUser, getAllUsers, updateUser };
