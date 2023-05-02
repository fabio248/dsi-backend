import { Entity, Column } from 'typeorm';
import { Person } from './Person';

@Entity()
export class User extends Person {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'recorvery_token' })
  recoveryToken: string;
}
