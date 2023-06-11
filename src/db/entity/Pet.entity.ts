import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from './User.entity';
import { BaseEntity } from './BaseEntity';
import { Especie } from './Especie.entity';
import { MedicalHistory } from './MedicalHistory.entity';

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

  @Column({ name: 'is_have_tatto' })
  isHaveTatto: boolean;

  @Column()
  pedigree: boolean;

  @Column()
  birthday: Date;

  @OneToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.pet, {
    cascade: true,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'medical_history_id' })
  medicalHistory: MedicalHistory;

  @ManyToOne(() => Especie, (specie) => specie.pet)
  @JoinColumn({ referencedColumnName: 'id', name: 'specie_id' })
  specie: Especie;

  @ManyToOne(() => User, (user) => user.pet)
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: User;
}
