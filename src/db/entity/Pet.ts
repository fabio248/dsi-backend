import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

export enum Gender {
  M = 'masculino',
  F = 'femenino',
}
@Entity('pet')
export class Pet extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  species: string;

  @Column()
  raza: string;

  @Column()
  color: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  weight: number;

  @Column({ name: 'is_have_tatto' })
  isHaveTatto: boolean;

  @Column()
  pedigree: boolean;

  @Column()
  birthday: Date;

  @ManyToOne(() => User, (user) => user.pet)
  user: User;
}
