const { body } = require('express-validator');


export const productsValidationRules = [
  body('products').isArray().withMessage('products must be an array'),
  body('products.*.productId').notEmpty().withMessage('id is required'),
  body('products.*.quantity').notEmpty().withMessage('quantity is required'),
];
