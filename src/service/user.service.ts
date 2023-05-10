import bcrypt from 'bcryptjs';
import boom from 'boom';
import { User } from '../db/entity/User';
import { AppDataSource } from '../data-source';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(data): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(data.password, salt);
    const newUser: User = Object.assign(new User(), {
      ...data,
      password: hashPassword,
      email: data.email.toLowerCase(),
    });

    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  async getUser(email): Promise<User> {
    const getuser = await this.userRepository.findOneBy({ email });
    if (getuser === null) {
      throw boom.badRequest('User not found');
    } else if (email != getuser.email) {
      throw boom.badRequest('User not found');
    }
    return getuser;
  }

  async getUserForId(id): Promise<User> {
    const getuser = await this.userRepository.findOneBy({ id });
    if (getuser === null) {
      throw boom.badRequest('User not found');
    } else if (id != getuser.id) {
      throw boom.badRequest('User not found');
    }
    delete getuser.password;
    return getuser;
  }

  async deleteUser(email) {
    const userDelete = await this.userRepository.delete({ email });
    return userDelete;
  }

  //obtener todos los usuarios
  async getAllUsers(): Promise<Array<User>> {
    const allUser: Array<User> = await this.userRepository.find();
    allUser.map((user: User) => delete user.password);
    return allUser;
  }

  async updateUser(id, data) {
    await this.userRepository.update(id, data);
    //es un test para verificar que los datos se han actualizado
    //este elemento no debe existir en la etapa final
    const UserUpdated = await this.getUserForId(id);
    return UserUpdated;
  }
}
