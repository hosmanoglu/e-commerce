import { Router } from 'express';
import { prisma } from '../db/prisma';

import { validateRequest } from '../middlewares/validation';
import { stockCheckValidationRules } from '../validators/stockValidation';
import { authenticateUser } from '../middlewares/authenticate';

const stockController = Router();

stockController.post('/check', authenticateUser, validateRequest(stockCheckValidationRules), async (req, res, next) => {
  try {
    const { products } = req.body;

    let dbProducts = await prisma.product.findMany({
      select: { productId: true, stock: true, price: true },
      where: { productId: { in: products.map((x: { productId: string }) => x.productId) } },
    });

    for (const product of products) {
      let dbProduct = dbProducts.find(x => x.productId === product.productId);
      if (dbProduct) {
        product.quantity = product.quantity < dbProduct.stock ? product.quantity : dbProduct.stock;
        product.price=dbProduct.price
      } else {
        product.quantity = 0;
        product.price=0
      }
    }

    res.json(products);
  } catch (error) {
    next(error);
  }
});

export { stockController };
