import { Router } from 'express';
import { prisma } from '../db/prisma';
import { authenticateAdmin, authenticateUser } from '../middlewares/authenticate';
import { CustomRequest } from '../types/customRequest';
import { clearCart, getCart } from '../clients/cart';
import { OrderProduct, OrderStatus } from '@prisma/client';
import { sendMessage } from '../rabbitmq/sendMessage';

const RABBITMQ_DECRASE_STOCK = process.env.RABBITMQ_DECRASE_STOCK as string;
const RABBITMQ_INCREASE_STOCK = process.env.RABBITMQ_INCREASE_STOCK as string;

const orderController = Router();

orderController.post('/', authenticateUser, async (req: CustomRequest, res, next) => {
  try {
    const userId = req.user?.id as string;

    // get user cart
    let cart = await getCart(req.headers);
    if (cart.currentCart.length===0) {
      res.status(404).json({ message: 'cart is empty' });
      return
    }

    let order = await prisma.order.create({
      data: { userId, orderProducts: { createMany: { data: cart.currentCart as unknown as OrderProduct } } },
      select: { orderProducts: true, id: true },
    });

    decreaseStock(order);

    clearCart(req.headers);

    res.json({ order });
  } catch (error) {
    next(error);
  }
});

orderController.get('/', authenticateUser, async (req: CustomRequest, res, next) => {
  try {
    const userId = req.user?.id as string;
    const orders = await prisma.order.findMany({ where: { userId } });

    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

orderController.get('/:id', authenticateAdmin, async (req, res, next) => {
  try {
    const orders = await prisma.order.findUnique({ where: { id: req.params.id } });

    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

orderController.post('/finish/:orderId', authenticateAdmin, async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({ where: { id: req.params.orderId } });
    if (order === null) {
      res.status(404).json({ message: 'order not found' });
      return;
    }
    const updatedOrder = await prisma.order.update({ where: { id: order.id }, data: { status: OrderStatus.FINISHED }, select: { orderProducts: true ,status:true,id:true } });

    res.json({ updatedOrder });
  } catch (error) {
    next(error);
  }
});

orderController.post('/cancel/:orderId', authenticateUser, async (req: CustomRequest, res, next) => {
  try {
    const userId = req.user?.id as string;
    let order = await prisma.order.findUnique({ where: { id: req.params.orderId, userId }, select: { id: true, status: true } });
    if (order === null) {
      res.status(404).json({ message: 'order not found' });
      return;
    }

    const updatedOrder = await prisma.order.update({ where: { id: order.id }, data: { status: OrderStatus.CANCELLED }, select: { orderProducts: true } });

    increaseStock(updatedOrder);
    res.status(200).json({ message: 'order cancelled' });
  } catch (error) {
    next(error);
  }
});

async function decreaseStock(order: { id: string; orderProducts: { id: string; orderId: string; productId: string; quantity: number; price: number }[] }) {
  await sendMessage(
    RABBITMQ_DECRASE_STOCK,
    order.orderProducts.map(x => {
      return { productId: x.productId, quantity: x.quantity };
    }),
  );
}

async function increaseStock(order: { orderProducts: { id: string; orderId: string; productId: string; quantity: number; price: number }[] }) {
  await sendMessage(
    RABBITMQ_INCREASE_STOCK,
    order.orderProducts.map(x => {
      return { productId: x.productId, quantity: x.quantity };
    }),
  );
}

export { orderController };
