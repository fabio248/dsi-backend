import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

export const userService = new UserService();
export const authService = new AuthService(userService);
