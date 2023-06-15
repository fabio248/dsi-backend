import AppointmentService from '../../service/appointment.service';
import { AuthService } from '../../service/auth.service';
import FileService from '../../service/file.service';
import { PetService } from '../../service/pet.service';
import { SpecieService } from '../../service/specie.service';
import { UserService } from '../../service/user.service';

export const userService = new UserService();
export const authService = new AuthService(userService);
export const petService = new PetService();
export const specieService = new SpecieService();
export const fileService = new FileService();
export const appointmentService = new AppointmentService();
