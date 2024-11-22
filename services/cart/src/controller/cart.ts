import { Router } from 'express';
import { prisma } from '../db/prisma';
import { validateRequest } from '../middlewares/validation';
import { productsValidationRules } from '../validators/productValidation';
import { authenticateUser } from '../middlewares/authenticate';
import { CustomRequest } from '../types/customRequest';

import { checkStocks } from '../clients/catalog';
import { InputJsonObject, JsonValue } from '@prisma/client/runtime/library';
import { CartItem } from '../types/cart';
import _ from 'lodash';

const cartController = Router();

cartController.post('/add', authenticateUser, validateRequest(productsValidationRules), async (req: CustomRequest, res, next) => {
  try {
    const { products } = req.body;
    const userId = req.user?.id as string;

    let oldCart:
      | { cart: any }
      | {
          id: string;
          userId: string;
          cart: JsonValue;
        }
      | null = await prisma.cart.findUnique({ where: { userId } });

    const oldCartCopy = _.cloneDeep(oldCart);
    if (oldCart !== null) {
      const cart = oldCart.cart as unknown as [CartItem];
      for (const product of products) {
        let dbProductIndex = cart.findIndex(x => x.productId === product.productId);
        if (dbProductIndex !== -1) {
          cart[dbProductIndex].quantity += product.quantity;
        } else {
          cart.push(product);
        }
      }
    } else {
      oldCart = { cart: products };
    }

    //send product service see stocks
    let actualCart = await checkStocks({ products: oldCart.cart }, req.headers);
    let filterdCart = actualCart.filter(x => x.quantity > 0);

    let dbCart = await prisma.cart.upsert({
      where: { userId },
      create: { userId, cart: filterdCart as unknown as InputJsonObject },
      update: { userId, cart: filterdCart as unknown as InputJsonObject },
      select: { userId: true, cart: true },
    });

    res.json({ oldCart: oldCartCopy?.cart, currentCart: dbCart.cart });
  } catch (error) {
    next(error);
  }
});

cartController.post('/remove', authenticateUser, async (req: CustomRequest, res, next) => {
  try {
    try {
      const { products } = req.body;
      const userId = req.user?.id as string;

      let oldCart:
        | { cart: any }
        | {
            id: string;
            userId: string;
            cart: JsonValue;
          }
        | null = await prisma.cart.findUnique({ where: { userId } });
      if (oldCart === null) {
        res.json({ oldCart: [], currentCart: [] });
        return;
      }

      const oldCartCopy = _.cloneDeep(oldCart);
      if (oldCart !== null) {
        const cart = oldCart.cart as unknown as [CartItem];
        for (const product of products) {
          let dbProductIndex = cart.findIndex(x => x.productId === product.productId);
          if (dbProductIndex !== -1) {
            cart[dbProductIndex].quantity -= product.quantity;
          }
        }
      }

      //send product service see stocks
      let actualCart = await checkStocks({ products: oldCart.cart }, req.headers);
      let filterdCart = actualCart.filter(x => x.quantity > 0);

      let dbCart = await prisma.cart.upsert({
        where: { userId },
        create: { userId, cart: filterdCart as unknown as InputJsonObject },
        update: { userId, cart: filterdCart as unknown as InputJsonObject },
        select: { userId: true, cart: true },
      });

      res.json({ oldCart: oldCartCopy?.cart, currentCart: dbCart.cart });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

cartController.get('/', authenticateUser, async (req: CustomRequest, res, next) => {
  try {
    const userId = req.user?.id as string;

    let oldCart = await prisma.cart.findUnique({ where: { userId } });
    if (oldCart === null) {
      res.json({ currentCart: [] });
      return;
    }
    //send product service see stocks
    let actualCart = await checkStocks({ products: oldCart.cart }, req.headers);
    let filterdCart = actualCart.filter(x => x.quantity > 0);

    let dbCart = await prisma.cart.upsert({
      where: { userId },
      create: { userId, cart: filterdCart as unknown as InputJsonObject },
      update: { userId, cart: filterdCart as unknown as InputJsonObject },
      select: { userId: true, cart: true },
    });

    res.json({ currentCart: dbCart.cart });
  } catch (error) {
    next(error);
  }
});

cartController.post('/clear', authenticateUser, async (req: CustomRequest, res, next) => {
  try {
    const userId = req.user?.id as string;

    let oldCart = await prisma.cart.delete({ where: { userId } });

    res.json({ oldCart: oldCart.cart });
  } catch (error) {
    next(error);
  }
});

export { cartController };
