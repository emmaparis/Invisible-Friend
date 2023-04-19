const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

const userErrorMessages = {
  validationError: 'Validation error',
  noUserError: 'No user with that ID',
};

const friendSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  language: Joi.string().min(3).max(30).required(),
  age: Joi.number().min(1).max(100).required(),
  mood: Joi.string().min(3).max(30).required(),
  user: Joi.string().min(3).max(30).required(),
});

const friendErrorMessages = {
  validationError: 'Validation error',
  noFriendError: 'No friend with that ID',
};

const expertSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  language: Joi.string().min(3).max(30).required(),
  expertise: Joi.string().min(3).max(30).required(),
  user: Joi.string().min(3).max(30).required(),
});

const expertErrorMessages = {
  validationError: 'Validation error',
  noExpertError: 'No expert with that ID',
};

module.exports = {
  userSchema,
  userErrorMessages,
  friendSchema,
  friendErrorMessages,
  expertSchema,
  expertErrorMessages,
};
