const { body } = require('express-validator');


export const stockUpdateValidationRules = [
  body('products').isArray().withMessage('products must be an array'),
  body('products.*.id').notEmpty().withMessage('id is required'),
  body('products.*.stock').notEmpty().withMessage('stock is required'),
  body('products.*.stock.increment').notEmpty().withMessage('stock is required'),
  body('products.*.stock.decrement').notEmpty().withMessage('stock is required'),
];
