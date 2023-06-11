import { NextFunction, Request, Response } from 'express';
import { petService } from '../utils/dependencies/dependencies';
import { Pet } from '../db/entity/Pet.entity';

export async function createPet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = req.body;
    const { userId } = req.params;
    const newPet = await petService.create({
      ...input,
      user: parseInt(userId),
    });

    res.status(201).json({ message: 'pet created', data: newPet });
  } catch (error) {
    next(error);
  }
}

export async function findAllPets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const pets: Pet[] = await petService.all();

    res.status(200).json({ message: 'pets found', data: pets });
  } catch (error) {
    next(error);
  }
}

export async function updatePet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { petId } = req.params;
    const inpt = req.body;

    const updatePet = await petService.update(+petId, inpt);

    res.status(200).json({ message: 'updated pet', data: updatePet });
  } catch (error) {
    next(error);
  }
}

export async function getPet(req: Request, res: Response, next: NextFunction) {
  try {
    const { petId } = req.params;

    const pet = await petService.findOne(+petId);

    res.status(200).json({ message: 'found pet', data: pet });
  } catch (error) {
    next(error);
  }
}

export async function deletePet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { petId } = req.params;

    await petService.delete(+petId);

    res.status(200).json({ message: `deleted pet with id: ${petId}` });
  } catch (error) {
    next(error);
  }
}
