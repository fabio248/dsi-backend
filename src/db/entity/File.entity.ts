import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { MedicalHistory } from './MedicalHistory.entity';

@Entity()
export class File extends BaseEntity {
  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.file)
  @JoinColumn({ referencedColumnName: 'id', name: 'medical_history_id' })
  medicalHistory: MedicalHistory;
}
