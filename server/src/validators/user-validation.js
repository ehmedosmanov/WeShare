import Joi from 'joi'

const userValidationSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .message('Please enter only letters')
    .trim()
    .required(),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .message('Please enter only letters')
    .trim()
    .required(),
  username: Joi.string().trim().required(),
  phoneNumber: Joi.string()
    .trim()
    .pattern(
      /^(?:0|994)(?:12|51|50|55|70|77)[^\w]{0,2}[2-9][0-9]{2}[^\w]{0,2}[0-9]{2}[^\w]{0,2}[0-9]{2}[^\d]$/
    )
    .message('Phone number must contain only digits'),
  email: Joi.string().trim().email().required(),
  password: Joi.string()
    .min(8)
    .message('Password must be at least 8 characters long')
    .max(14)
    .message('Password must not exceed 14 characters')
    .required()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,14}$'
      )
    )
    .message(
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ),

  avatar: Joi.string().trim().uri(),
  cover: Joi.string().trim().uri(),
  status: Joi.string().valid('Online', 'Offline'),
  twoFactorEnabled: Joi.boolean(),
  gender: Joi.string(),
  birthYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  birthMonth: Joi.number().integer().min(1).max(12),
  birthDay: Joi.number().integer().min(1).max(31),
  resetPasswordToken: Joi.string(),
  resetPasswordExpires: Joi.date(),
  emailVerificationToken: Joi.string(),
  emailVerificationExpires: Joi.date(),
  forgetPasswordToken: Joi.string(),
  forgetPasswordExpires: Joi.date(),
  otpCode: Joi.string(),
  otpCodeExpires: Joi.date()
})

export default userValidationSchema
