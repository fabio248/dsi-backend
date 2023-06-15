import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User.entity';

@Entity()
export class Appointment extends BaseEntity {
  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ referencedColumnName: 'id', name: 'client_id' })
  client: User;
}
