import { Entity, Column, OneToMany } from 'typeorm';
import { Person } from './Person.entity';
import { Pet } from './Pet.entity';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
}

@Entity()
export class User extends Person {
  @Column({ unique: true })
  email: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  direction: string;

  @Column({ length: 10, nullable: true })
  dui: string;

  @Column()
  password: string;

  @Column({ name: 'recorvery_token', nullable: true })
  recoveryToken: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  @OneToMany(() => Pet, (pet) => pet.user)
  pet: Pet[];
}
