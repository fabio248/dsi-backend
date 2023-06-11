import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { MedicalHistory } from './MedicalHistory.entity';

@Entity({ name: 'physical_exam' })
export class PhysicalExam extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  weight: number;

  @Column()
  palpitations: string;

  @OneToOne(
    () => MedicalHistory,
    (medicalHistory) => medicalHistory.physicalExam
  )
  medicalHistory: MedicalHistory;
}
