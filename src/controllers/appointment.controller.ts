import { NextFunction, Request, Response } from 'express';
import {
  appointmentService,
  userService,
} from '../utils/dependencies/dependencies';

export async function createAppointment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    const { id } = await userService.getUserByEmail(data.emailClient);

    const appointment = await appointmentService.create({
      ...data,
      emailClient: undefined,
      client: id,
    });

    res.status(201).json({ message: 'appointment created', data: appointment });
  } catch (error) {
    next(error);
  }
}

export async function getOneAppointent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { appointmentId } = req.params;

    const appointment = await appointmentService.getAppointById(+appointmentId);

    res.status(200).json({ message: 'appointment found', data: appointment });
  } catch (error) {
    next(error);
  }
}

export async function getAllAppointments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const listAppointments = await appointmentService.getAll();

    res
      .status(200)
      .json({ message: 'appointments found', data: listAppointments });
  } catch (error) {
    next(error);
  }
}

export async function updateAppointment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    const { appointmentId } = req.params;

    const updatedAppointment = await appointmentService.update(
      data,
      +appointmentId
    );

    res
      .status(200)
      .json({ message: 'updated appointment', data: updatedAppointment });
  } catch (error) {
    next(error);
  }
}

export async function deleteAppointment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { appointmentId } = req.params;

    await appointmentService.delete(+appointmentId);

    res
      .status(200)
      .json({ message: `deleted appointment with id: ${appointmentId}` });
  } catch (error) {
    next(error);
  }
}
