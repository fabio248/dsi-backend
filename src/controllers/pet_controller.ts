import { NextFunction, Request, Response } from 'express';
import { PetService } from '../service/pet.service';

const petService = new PetService();

export const createPet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const input = req.body;
    const newPet = await petService.create(input);
    res.status(201).json({ message: 'pet created', data: newPet });
  } catch (error) {
    next(error);
  }
};
