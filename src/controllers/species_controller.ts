import { NextFunction, Request, Response } from 'express';
import { specieService } from '../utils/dependencies/dependencies';

export async function createSpecie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const input = req.body;
    const specie = await specieService.create(input);
    res.status(201).json({ message: 'Specie created', data: specie });
  } catch (error) {
    next(error);
  }
}

export async function findAllSpecies(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const species = await specieService.all();
    res.status(201).json({ message: 'Species found', data: species });
  } catch (error) {
    next(error);
  }
}
