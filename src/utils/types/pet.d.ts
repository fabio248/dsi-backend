import { Gender, Pet } from '../../db/entity/Pet.entity';

export interface createPetEntry extends Pet {
  name: string;
  specieId: string;
  race: string;
  color: string;
  weight: number;
  pedigree: boolean;
  isHaveTatto: boolean;
  birthday: Date;
  gender: Gender;
}
