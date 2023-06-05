import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';
import { BaseEntity } from './BaseEntity';
import { Especie } from './Especie.entity';

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

  @ManyToOne(() => Especie, (specie) => specie.pet)
  specie: Especie;

  @ManyToOne(() => User, (user) => user.pet)
  @JoinColumn()
  user: User;
}
