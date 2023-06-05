import { notFound } from 'boom';
import { AppDataSource } from '../data-source';
import { Pet } from '../db/entity/Pet.entity';
import { createPetEntry } from '../utils/types/pet';
import { specieService } from '../utils/dependencies/dependencies';

export class PetService {
  private petRepo = AppDataSource.getRepository(Pet);

  async create(input: createPetEntry, userId: number) {
    await specieService.findOne(+input.specie);

    const newPet = Object.assign(new Pet(), { ...input, user: userId });
    const pet = this.petRepo.save(newPet);

    return pet;
  }

  async all(): Promise<Pet[]> {
    const pets: Pet[] = await this.petRepo.find();

    return pets;
  }

  async findOne(petId: number): Promise<Pet> {
    const pet = await this.petRepo.findOne({
      where: { id: petId },
      select: {
        user: {
          firstName: true,
          lastName: true,
          direction: true,
          birthday: true,
          dui: true,
          email: true,
          phone: true,
          id: true,
        },
        specie: {
          id: true,
          name: true,
        },
      },
      relations: {
        user: true,
        specie: true,
      },
    });

    if (!pet) {
      notFound('pet not found');
    }

    return pet;
  }

  async update(petId: number, input: Partial<Pet>) {
    await this.findOne(petId);

    if (input.specie) {
      await specieService.findOne(+input.specie);
    }

    await this.petRepo.update(petId, input);

    return await this.findOne(petId);
  }

  async delete(petId: number): Promise<void> {
    await this.findOne(petId);
    await this.petRepo.delete({ id: petId });
  }
}
