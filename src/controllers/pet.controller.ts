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
    const newPet = await petService.create(input, parseInt(userId));
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
  } catch (error) {}
}
