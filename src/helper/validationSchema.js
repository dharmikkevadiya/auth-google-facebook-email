const Joi = require("joi");

const userSchema = {
  signup: Joi.object().keys({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[\d()+\-.\s]{10,15}$/), // Allow digits, parentheses, plus, hyphen, period, and spaces (e.g., +1 (555) 123-4567)
    password: Joi.string()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .message(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
      )
      .required(),
  }),

  //login
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = userSchema;
