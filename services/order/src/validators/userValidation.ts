const { body } = require('express-validator');

export const userValidationRules = [
  body('email').notEmpty().withMessage('email is required'),
  body('password').notEmpty().withMessage('password is required'),
];

export const orderCreateValidationRules = [
  body('orderProducts').isArray().withMessage('products must be an array'),
  body('users.*.productId').notEmpty().withMessage('productId is required'),
  body('users.*.quantity').notEmpty().withMessage('quantity is required'),
];
