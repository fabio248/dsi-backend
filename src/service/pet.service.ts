import { notFound } from 'boom';
import { AppDataSource } from '../data-source';
import { Pet } from '../db/entity/Pet.entity';
import { createPetEntry } from '../utils/types/pet';
import { specieService, userService } from '../utils/dependencies/dependencies';
import { convertDateEnglishFormat } from '../utils/jsonFunction';
import { selectInfoPet } from '../utils/selectInfoEntity';

export class PetService {
  private petRepo = AppDataSource.getRepository(Pet);

  async create(input: createPetEntry) {
    await specieService.findOne(+input.specie);
    await userService.getUserById(+input.user);

    const dateEnglishFormat = convertDateEnglishFormat(
      input.birthday.toString()
    );

    const pet = await this.petRepo.save({
      ...input,
      birthday: dateEnglishFormat,
    });

    return pet;
  }

  async all(): Promise<Pet[]> {
    const pets: Pet[] = await this.petRepo.find({
      relations: {
        medicalHistory: {
          food: true,
          physicalExam: true,
          otherPet: true,
          file: true,
        },
        user: true,
      },
      select: selectInfoPet,
    });

    return pets;
  }

  async findOne(petId: number): Promise<Pet> {
    const pet = await this.petRepo.findOne({
      where: { id: petId },
      select: selectInfoPet,
      relations: {
        user: true,
        specie: true,
        medicalHistory: {
          food: true,
          otherPet: true,
          physicalExam: true,
          file: true,
        },
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
