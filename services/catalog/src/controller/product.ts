import { Router } from 'express';
import { prisma } from '../db/prisma';

import { validateRequest } from '../middlewares/validation';
import { productsValidationRules } from '../validators/productValidation';
import { authenticateAdmin,authenticateUser } from '../middlewares/authenticate';
import { sendMessage } from '../rabbitmq/sendMessage';

const RABBITMQ_CATALOG_QUEUE = process.env.RABBITMQ_CATALOG_QUEUE as string;

const productController = Router();

productController.post('/', authenticateAdmin, validateRequest(productsValidationRules), async (req, res, next) => {
  try {
    const { products } = req.body;

    await sendMessage(RABBITMQ_CATALOG_QUEUE, products);
    res.json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
});

productController.get('/', authenticateUser, async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();

    res.json(products);
  } catch (error) {
    next(error);
  }
});

productController.get('/:productId', authenticateUser, async (req, res, next) => {
  try {
    const products = await prisma.product.findUnique({ where: { productId: req.params.productId } });

    res.json(products);
  } catch (error) {
    next(error);
  }
});

productController.delete('/:productId', authenticateAdmin, async (req, res, next) => {
  try {
    await prisma.product.delete({ where: { productId: req.params.productId } });

    res.json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
});

export { productController as catalogController };
