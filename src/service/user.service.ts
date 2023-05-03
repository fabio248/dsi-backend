import bcrypt from 'bcryptjs';
import { User } from '../db/entity/User';
import { AppDataSource } from '../data-source';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(data): Promise<User> {
    const hashPassword: string = await bcrypt.hash(data.password, 10);
    const newUser: User = Object.assign(new User(), {
      ...data,
      password: hashPassword,
    });

    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }
}
