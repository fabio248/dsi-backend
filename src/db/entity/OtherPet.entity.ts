import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { MedicalHistory } from './MedicalHistory.entity';

@Entity()
export class OtherPet extends BaseEntity {
  @Column({ name: 'is_live_other_pets' })
  isLiveOtherPets: boolean;

  @Column({ name: 'which_pets', nullable: true })
  whichPets: string;

  @OneToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.otherPet)
  medicalHistory: MedicalHistory;
}
