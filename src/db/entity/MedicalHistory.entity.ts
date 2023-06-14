import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import Food from './Food.entity';
import { PhysicalExam } from './PhysicalExam.entity';
import { OtherPet } from './OtherPet.entity';
import { Pet } from './Pet.entity';
import { File } from './File.entity';

@Entity('medical_history')
export class MedicalHistory extends BaseEntity {
  @Column({ name: 'is_have_all_vaccine' })
  isHaveAllVaccine: boolean;

  @Column({ name: 'is_reproduced' })
  isReproduced: boolean;

  @Column()
  descendants: string;

  @Column()
  room: string;

  @Column({ name: 'diases_evaluation' })
  diasesEvaluation: string;

  @Column()
  observation: string;

  @OneToOne(() => Pet, (pet) => pet.medicalHistory)
  pet: Pet;

  @OneToOne(() => Food, (food) => food.medicalHistory, { cascade: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'food_id' })
  food: Food;

  @OneToOne(() => PhysicalExam, (phisicalExam) => phisicalExam.medicalHistory, {
    cascade: true,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'phisical_exam_id' })
  physicalExam: PhysicalExam;

  @OneToOne(() => OtherPet, (otherPet) => otherPet.medicalHistory, {
    cascade: true,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'other_pet_id' })
  otherPet: OtherPet;

  @OneToMany(() => File, (file) => file.medicalHistory, { cascade: true })
  file: File[];
}
