const { body } = require('express-validator');

export const userValidationRules = [
  body('email').notEmpty().withMessage('email is required'),
  body('password').notEmpty().withMessage('password is required'),
];

export const usersValidationRules = [
  body('users').isArray().withMessage('products must be an array'),
  body('users.*.email').notEmpty().withMessage('email is required'),
  body('users.*.password').notEmpty().withMessage('password is required'),
];
