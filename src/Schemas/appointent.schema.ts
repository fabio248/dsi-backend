import Joi from 'joi';

const id = Joi.number();
const startDate = Joi.string();
//   .pattern(
//     new RegExp(
//       '^(\d{2})/(\d{2})/(\d{4}) (\d{2}:\d{2})$'
//     )
//   )
//   .error(new Error("mal formato de fecha debe ser: 'dd/mm/aaaa HH:MM'"));
const endDate = Joi.string();
const name = Joi.string();
const description = Joi.string();
const email = Joi.string().email();

export const createAppointmentSchema = Joi.object({
  startDate: startDate.required(),
  endDate: endDate.required(),
  name: name.required(),
  description: description.required(),
  emailClient: email.required(),
});

export const updateAppointmentSchema = Joi.object({
  startDate,
  endDate,
  name,
  description,
});

export const getAppintmentSchema = Joi.object({
  appointmentId: id.required(),
});
