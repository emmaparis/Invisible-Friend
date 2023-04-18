const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});

const errorMessages = {
    validationError: 'Validation error',
    noUserError: 'No user with that ID',
};

export { userSchema, errorMessages };