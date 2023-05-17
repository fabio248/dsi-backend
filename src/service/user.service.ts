import bcrypt from 'bcryptjs';
import boom from 'boom';
import { User } from '../db/entity/User';
import { AppDataSource } from '../data-source';
import { userEntry, userEntryWithoutSensitiveInfo } from '../utils/types/user';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(data: userEntry): Promise<userEntryWithoutSensitiveInfo> {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword: string = await bcrypt.hash(data.password, salt);
    const birthday = new Date(data.birthday);
    const newUser: userEntryWithoutSensitiveInfo = Object.assign(new User(), {
      password: hashPassword,
      email: data.email.toLowerCase(),
      birthday,
      ...data,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUser(email: string): Promise<userEntry> {
    const getuser: userEntry = await this.userRepository.findOneBy({ email });

    if (!getuser) {
      throw boom.badRequest('User not found');
    }

    return getuser;
  }

  async getUserForId(id): Promise<User> {
    const getuser = await this.userRepository.findOneBy({ id });

    if (!getuser) {
      throw boom.badRequest('User not found');
    }

    delete getuser.password;
    return getuser;
  }

  async deleteUser(email: string) {
    const userDelete = await this.userRepository.delete({ email });
    return userDelete;
  }

  //obtener todos los usuarios
  async getAllUsers(): Promise<Array<User>> {
    const allUser: Array<User> = await this.userRepository.find();
    allUser.map((user: User) => delete user.password);
    return allUser;
  }

  async updateUser(id: string, data: object) {
    await this.userRepository.update(id, data);
    //es un test para verificar que los datos se han actualizado
    //este elemento no debe existir en la etapa final
    const UserUpdated = await this.getUserForId(id);
    return UserUpdated;
  }
}
