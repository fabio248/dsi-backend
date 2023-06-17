import { Router } from 'express';
import { validatorHandler } from '../middleware/validator.handler';
import {
  createAppointmentSchema,
  getAppintmentSchema,
  updateAppointmentSchema,
} from '../Schemas/appointent.schema';
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getOneAppointent,
  updateAppointment,
} from '../controllers/appointment.controller';
import {
  getUserSchemaByEmail,
  getUserSchemaById,
} from '../Schemas/user.schema';

export const appointmentRouter = Router();

appointmentRouter
  .route('/')
  .post([validatorHandler(createAppointmentSchema, 'body')], createAppointment)
  .get(getAllAppointments);

appointmentRouter
  .route('/:appointmentId')
  .all(validatorHandler(getAppintmentSchema, 'params'))
  .get(getOneAppointent)
  .patch(validatorHandler(updateAppointmentSchema, 'body'), updateAppointment)
  .delete(deleteAppointment);
