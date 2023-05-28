import { AppDataSource } from '../data-source';
import { Pet } from '../db/entity/Pet.entity';
import { createPetEntry } from '../utils/types/pet';

export class PetService {
  private petRepo = AppDataSource.getRepository(Pet);

  async create(input: createPetEntry, userId: number) {
    const newPet = Object.assign(new Pet(), { ...input, user: userId });
    const pet = this.petRepo.save(newPet);
    return pet;
  }

  async all(): Promise<Pet[]> {
    const pets: Pet[] = await this.petRepo.find();

    return pets;
  }
}
