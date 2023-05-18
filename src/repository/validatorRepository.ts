import { Request } from "express";
import Joi from "joi"

const EmployeeSchema = Joi.object({
  firstName: Joi.string().min(6).max(10).required(),
  lastName: Joi.string().min(6).max(10).required(),
  email: Joi.string().email().required(),
  number: Joi.string().regex(/^\+?\d{10}$/).required(),
  gender: Joi.string().valid("M", "F").required(),
  photo: Joi.string().allow(""),
})


export const validateEmployeeJoi = (payload: Request) =>
  EmployeeSchema.validate(payload, { abortEarly: false })
