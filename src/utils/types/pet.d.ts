import { Gender } from '../../db/entity/Pet.entity';

export interface createPetEntry {
  name: string;
  specie: string;
  race: string;
  color: string;
  weight: number;
  pedigree: string;
  isHaveTatto: boolean;
  birthday: Date;
  gender: Gender;
}
