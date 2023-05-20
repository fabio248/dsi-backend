import { Entity, Column } from 'typeorm';
import { Person } from './Person';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
}

@Entity()
export class User extends Person {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'recorvery_token', nullable: true })
  recoveryToken: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;
}
