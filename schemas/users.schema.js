const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().min(3).max(15);
const password = Joi.string().min(3).max(15);
const avatar = Joi.string().uri();
const email = Joi.string().email();

const createProductSchema = Joi.object({
  name: name.required(),
  password: password.required(),
  avatar: avatar,
  email: email.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  password: password,
  avatar: avatar,
  email: email,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
