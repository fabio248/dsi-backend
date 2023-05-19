import bcrypt from 'bcryptjs';
import boom from 'boom';
import { User } from '../db/entity/User';
import { AppDataSource } from '../data-source';
import { userEntry, userEntryWithoutSensitiveInfo } from '../utils/types/user';
import { UpdateResult } from 'typeorm';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(data: userEntry): Promise<userEntryWithoutSensitiveInfo> {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword: string = await bcrypt.hash(data.password, salt);
    const birthday = new Date(data.birthday);
    const newUser: userEntry = Object.assign(new User(), {
      ...data,
      password: hashPassword,
      email: data.email.toLowerCase(),
      birthday,
    });

    await this.userRepository.save(newUser);

    delete newUser.password;
    return newUser;
  }

  async getUserByEmail(email: string): Promise<userEntry> {
    const getuser: userEntry = await this.userRepository.findOneBy({ email });

    if (!getuser) {
      throw boom.notFound('User not found');
    }

    return getuser;
  }

  async getUserById(id): Promise<User> {
    const getuser = await this.userRepository.findOneBy({ id });

    if (!getuser) {
      throw boom.badRequest('User not found');
    }

    delete getuser.password;
    return getuser;
  }

  async deleteUser(id: number) {
    await this.getUserById(id);
    const userDelete = await this.userRepository.delete({ id });
    return userDelete;
  }

  //obtener todos los usuarios
  async getAllUsers(): Promise<Array<User>> {
    const allUser: Array<User> = await this.userRepository.find();
    allUser.map((user: User) => delete user.password);
    return allUser;
  }

  async updateUser(
    id: number,
    data: Partial<userEntry>
  ): Promise<userEntryWithoutSensitiveInfo> {
    //Check if exits the user
    await this.getUserById(id);

    if (data.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(data.password, salt);
      data.password = hashPassword;
    }
    //Update info
    await this.userRepository.update(id, data);

    const userUpdated = await this.getUserById(id);
    delete userUpdated.password;

    return userUpdated;
  }
}
