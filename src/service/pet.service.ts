import { AppDataSource } from '../data-source';
import { Pet } from '../db/entity/Pet';
import { createPetEntry } from '../utils/types/pet';

export class PetService {
  private petRepo = AppDataSource.getRepository(Pet);

  async create(input: createPetEntry) {
    const newPet = Object.assign(new Pet(), input);
    const pet = this.petRepo.save(newPet);
    return pet;
  }
}
