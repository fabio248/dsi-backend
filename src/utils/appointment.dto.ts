import { Exclude, Expose, Transform } from 'class-transformer';
import { Appointment } from '../db/entity/Appointment.entity';
import { User } from '../db/entity/User.entity';

export default class appointmentResponseDto extends Appointment {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ value }) =>
    value.toLocaleString('en-US', { timeZone: 'America/El_Salvador' })
  )
  startDate: Date;

  @Expose()
  @Transform(({ value }) =>
    value.toLocaleString('en-US', { timeZone: 'America/El_Salvador' })
  )
  endDate: Date;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  client: User;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
