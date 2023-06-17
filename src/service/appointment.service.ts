import { notFound } from '@hapi/boom';
import { AppDataSource } from '../data-source';
import { Appointment } from '../db/entity/Appointment.entity';
import { userService } from '../utils/dependencies/dependencies';
import { convertDateEnglishFormat } from '../utils/jsonFunction';
import { createAppointment } from '../utils/types/appoinment';

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

  async create(data: Partial<Appointment>): Promise<Appointment> {
    const startDate = convertDateEnglishFormat(data.startDate.toString());
    const endDate = convertDateEnglishFormat(data.endDate.toString());

    const appointment = await this.appointmentRepo.save({
      ...data,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    delete appointment.createdAt;
    delete appointment.updatedAt;

    return appointment;
  }

  async getAll(email?: string) {
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

    return appointment;
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

    return await this.getAppointById(id);
  }

  async delete(id: number) {
    await this.getAppointById(id);

    return await this.appointmentRepo.update(id, {
      isActive: this.INACTIVE_APPOINTMENT,
    });
  }
}
