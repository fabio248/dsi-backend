import { notFound } from 'boom';
import { AppDataSource } from '../data-source';
import { Pet } from '../db/entity/Pet.entity';
import { createPetEntry } from '../utils/types/pet';
import { specieService, userService } from '../utils/dependencies/dependencies';
import { convertDateEnglishFormat } from '../utils/jsonFunction';

export class PetService {
  private PET_IS_INACTIVE = false;
  private petRepo = AppDataSource.getRepository(Pet);
  private selectInfoPet = {
    id: true,
    isActive: true,
    name: true,
    gender: true,
    raza: true,
    color: true,
    isHaveTatto: true,
    pedigree: true,
    birthday: true,
    medicalHistory: {
      id: true,
      isActive: true,
      isHaveAllVaccine: true,
      isReproduced: true,
      descendants: true,
      room: true,
      diasesEvaluation: true,
      observation: true,
      food: {
        id: true,
        type: true,
        quantity: true,
        isActive: true,
      },
      physicalExam: {
        id: true,
        weight: true,
        palpitations: true,
      },
      otherPet: {
        id: true,
        isActive: true,
        isLiveOtherPets: true,
        whichPets: true,
      },
    },
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
  };
  private relationWithPet = {
    medicalHistory: { food: true, physicalExam: true, otherPet: true },
    user: true,
    specie: true,
  };

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
      relations: this.relationWithPet,
      select: this.selectInfoPet,
      where: {
        isActive: true,
      },
    });

    return pets;
  }

  async findOne(petId: number): Promise<Pet> {
    const pet = await this.petRepo.findOne({
      where: { id: petId, isActive: true },
      select: this.selectInfoPet,
      relations: this.relationWithPet,
    });

    if (!pet) {
      throw notFound('pet not found');
    }

    return pet;
  }

  async update(petId: number, input: Partial<Pet>) {
    let otherPet, physicalExam, food;

    const pet = await this.findOne(petId);

    if (input.specie) {
      await specieService.findOne(+input.specie);
    }

    if (input.birthday) {
      input.birthday = new Date(
        convertDateEnglishFormat(input.birthday.toString())
      );
    }

    const { medicalHistory } = input;

    if (medicalHistory) {
      otherPet = medicalHistory.otherPet;
      physicalExam = medicalHistory.physicalExam;
      food = medicalHistory.food;
    }

    const fieldtoUpdate = {
      ...pet,
      ...input,
      medicalHistory: {
        ...pet.medicalHistory,
        ...medicalHistory,
        otherPet: {
          ...pet.medicalHistory.otherPet,
          ...otherPet,
        },
        physicalExam: {
          ...pet.medicalHistory.physicalExam,
          ...physicalExam,
        },
        food: { ...pet.medicalHistory.food, ...food },
      },
    };

    await this.petRepo.save(fieldtoUpdate);

    return await this.findOne(petId);
  }

  async delete(petId: number): Promise<void> {
    await this.findOne(petId);
    await this.petRepo.update({ id: petId }, { isActive: false });
  }
}
