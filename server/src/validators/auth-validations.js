import Joi from 'joi'

export const registerSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .trim()
    .required()
    .messages({
      'string.empty': 'First name is required',
      'string.pattern.base': 'First name should contain only letters',
      'any.required': 'First name is a required field'
    }),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .trim()
    .required()
    .messages({
      'string.empty': 'Last name is required',
      'string.pattern.base': 'Last name must contain only letters',
      'any.required': 'Last name is required'
    }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': 'Username must be alphanumeric',
    'string.min': 'Username must be at least {#limit} characters long',
    'string.max': 'Username cannot be longer than {#limit} characters',
    'string.empty': 'Username is required',
    'any.required': 'Username is required'
  })
})

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': 'Username must be alphanumeric',
    'string.min': 'Username must be at least {#limit} characters long',
    'string.max': 'Username cannot be longer than {#limit} characters',
    'string.empty': 'Username is required',
    'any.required': 'Username is required'
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}(?:\\.[A-Za-z\\d@$!%*?&]*)?$'
      )
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit, and be at least 8 characters long',
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    })
})
