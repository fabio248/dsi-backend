import { Gender } from '../../db/entity/Pet.entity';

export interface createPetEntry {
  name: string;
  species: string;
  race: string;
  color: string;
  weight: number;
  pedigree: string;
  isHaveTatto: boolean;
  birthday: Date;
  gender: Gender;
}
