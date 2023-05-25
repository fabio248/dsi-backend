import { hashSync } from 'bcryptjs';
import boom from 'boom';
import { User } from '../db/entity/User';
import { AppDataSource } from '../data-source';
import { userEntry, userEntryWithoutSensitiveInfo } from '../utils/types/user';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(data: userEntry): Promise<userEntryWithoutSensitiveInfo> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (user) {
      throw boom.badData('Email already taken');
    }

    const newUser: userEntry = Object.assign(new User(), {
      ...data,
      password: hashSync(data.password, 10),
      birthday: new Date(data.birthday),
    });

    await this.userRepository.save(newUser);

    delete newUser.password;

    return newUser;
  }

  async getUserByEmail(email: string): Promise<userEntry> {
    const getuser: userEntry | null = await this.userRepository.findOneBy({
      email,
    });

    if (!getuser) {
      throw boom.notFound('User not found');
    }

    return getuser;
  }

  async getUserById(id: number): Promise<userEntry> {
    const getuser: userEntry | null = await this.userRepository.findOneBy({
      id,
    });

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
  async getAllUsers(): Promise<Array<userEntry>> {
    const allUser: Array<userEntry> = await this.userRepository.find();
    allUser.map((user: userEntry) => delete user.password);
    return allUser;
  }

  async updateUser(
    id: number,
    data: Partial<userEntry>
  ): Promise<userEntryWithoutSensitiveInfo> {
    //Check if exits the user
    await this.getUserById(id);

    if (data.password) {
      data.password = hashSync(data.password, 10);
    }
    //Update info
    await this.userRepository.update(id, data);

    const userUpdated = await this.getUserById(id);
    delete userUpdated.password;

    return userUpdated;
  }
}
