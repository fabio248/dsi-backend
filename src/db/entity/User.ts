import { Entity, Column, OneToMany } from 'typeorm';
import { Person } from './Person';
import { Pet } from './Pet';

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

  @OneToMany(() => Pet, (pet) => pet.user)
  pet: Pet[];
}
