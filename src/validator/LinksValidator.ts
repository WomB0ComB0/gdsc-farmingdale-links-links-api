import Joi from 'joi'

export const LinkValidator = Joi.object({
  id: Joi.string().required(),
  link: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
})