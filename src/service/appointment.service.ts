import { notFound } from '@hapi/boom';
import { AppDataSource } from '../data-source';
import { Appointment } from '../db/entity/Appointment.entity';
import { convertDateEnglishFormat } from '../utils/jsonFunction';
import { badData } from 'boom';
import { plainToInstance } from 'class-transformer';
import appointmentResponseDto from '../utils/appointment.dto';

export default class AppointmentService {
  private appointmentRepo = AppDataSource.getRepository(Appointment);
  private INACTIVE_APPOINTMENT = false;
  private selectInfoAppointment = {
    id: true,
    name: true,
    description: true,
    endDate: true,
    startDate: true,
    isActive: true,
    client: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      reatedAt: false,
      updatedAt: false,
    },
  };

  async create(data: Partial<Appointment>) {
    const startDate = convertDateEnglishFormat(data.startDate.toString());
    const endDate = convertDateEnglishFormat(data.endDate.toString());

    const exitingAppointment = await this.getAllWithOutTransform();

    const appointment = this.appointmentRepo.create({
      ...data,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    const isValidDate = this.validateEvent(appointment, exitingAppointment);

    if (!isValidDate) {
      throw badData('Este horario no se encuentra disponible');
    }
    this.appointmentRepo.save(appointment);

    delete appointment.createdAt;
    delete appointment.updatedAt;

    return plainToInstance(appointmentResponseDto, appointment);
  }

  async getAll(email?: string) {
    const listAppointment = await this.appointmentRepo.find({
      where: { isActive: !this.INACTIVE_APPOINTMENT, client: { email } },
      relations: { client: true },
      select: this.selectInfoAppointment,
    });

    return listAppointment.map((appointment) =>
      plainToInstance(appointmentResponseDto, appointment)
    );
  }

  async getAllWithOutTransform(email?: string) {
    const listAppointment = await this.appointmentRepo.find({
      where: { isActive: !this.INACTIVE_APPOINTMENT, client: { email } },
      relations: { client: true },
      select: this.selectInfoAppointment,
    });

    return listAppointment;
  }

  async getAppointById(id: number) {
    const appointment = await this.appointmentRepo.findOne({
      where: { id },
      relations: { client: true },
      select: this.selectInfoAppointment,
    });

    if (appointment.isActive === this.INACTIVE_APPOINTMENT || !appointment) {
      throw notFound('appointment not found');
    }

    return plainToInstance(appointmentResponseDto, appointment);
  }

  async update(data: Partial<Appointment>, id: number) {
    await this.getAppointById(id);
    let startDate = data.startDate;
    let endDate = data.endDate;

    await this.appointmentRepo.update(id, {
      ...data,
      startDate: startDate
        ? new Date(convertDateEnglishFormat(data.startDate.toString()))
        : undefined,
      endDate: endDate
        ? new Date(convertDateEnglishFormat(data.endDate.toString()))
        : undefined,
    });
    const appointment = await this.getAppointById(id);

    return plainToInstance(appointmentResponseDto, appointment);
  }

  async delete(id: number) {
    await this.getAppointById(id);

    return await this.appointmentRepo.update(id, {
      isActive: this.INACTIVE_APPOINTMENT,
    });
  }

  validateEvent(
    newAppointment: Appointment,
    existingAppointments: Appointment[]
  ): boolean {
    const startDate = new Date(newAppointment.startDate);

    if (startDate <= new Date()) {
      return false;
    }

    for (const appointment of existingAppointments) {
      if (
        appointment.startDate.toISOString().substr(0, 10) ===
        newAppointment.startDate.toISOString().substr(0, 10)
      ) {
        if (
          (appointment.startDate <= newAppointment.startDate &&
            newAppointment.startDate < appointment.endDate) ||
          (appointment.startDate < newAppointment.endDate &&
            newAppointment.endDate <= appointment.endDate) ||
          (newAppointment.startDate <= appointment.startDate &&
            appointment.startDate < newAppointment.endDate) ||
          (newAppointment.startDate < appointment.endDate &&
            appointment.endDate <= newAppointment.endDate)
        ) {
          return false; // Conflict found
        }
      }
    }
    return true; // No conflicts found
  }
}
