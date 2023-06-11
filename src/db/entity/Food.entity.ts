import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { MedicalHistory } from './MedicalHistory.entity';

@Entity()
export default class Food extends BaseEntity {
  @Column()
  quantity: string;

  @Column()
  type: string;

  @OneToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.food)
  medicalHistory: MedicalHistory;
}
