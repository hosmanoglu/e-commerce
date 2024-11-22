const { body } = require('express-validator');


export const productsValidationRules = [
  body('products').isArray().withMessage('products must be an array'),
  body('products.*.name').notEmpty().withMessage('name is required'),
  body('products.*.price').notEmpty().withMessage('price is required'),
  body('products.*.stock').notEmpty().withMessage('stock is required'),
];
