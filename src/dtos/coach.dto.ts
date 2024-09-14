// src/dtos/coach.dto.ts
import Joi from 'joi';

export const createCoachSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  fullName: Joi.string().required(),
  gender: Joi.string().valid('MALE', 'FEMALE').required(),
  dob: Joi.date().required(),
  password: Joi.string().required(),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords must match',
    }),
});

export const updateCoachSchema = Joi.object({
  phoneNumber: Joi.string().optional(),
  fullName: Joi.string().optional(),
  gender: Joi.string().valid('MALE', 'FEMALE').optional(),
  dob: Joi.date().optional(),
});
