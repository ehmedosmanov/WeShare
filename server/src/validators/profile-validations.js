import Joi from 'joi'

export const profileSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .trim()
    .required()
    .messages({
      'string.empty': 'First name is a required field',
      'string.pattern.base': 'First name should contain only letters',
      'any.required': 'First name is a required field'
    }),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .trim()
    .required()
    .messages({
      'string.empty': 'Last name is a required field',
      'string.pattern.base': 'Last name must contain only letters',
      'any.required': 'Last name is required'
    }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.empty': 'Username is a required field',
    'string.alphanum': 'Username must be alphanumeric',
    'string.min': 'Username must be at least {#limit} characters long',
    'string.max': 'Username cannot be longer than {#limit} characters',
    'any.required': 'Username is required'
  }),
  bio: Joi.string()
    .max(160)
    .messages({
      'string.max': 'Username cannot be longer than {#limit} characters'
    })
    .allow('')
    .allow(null),
  gender: Joi.string().valid('Male', 'Female').allow(null).allow('')
})
