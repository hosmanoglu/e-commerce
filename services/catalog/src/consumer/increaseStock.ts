import { receiveMessage } from '../rabbitmq/receiveMessage';
import { prisma } from '../db/prisma';
import { CartItem } from '../types/cart';

const RABBITMQ_INCREASE_STOCK = process.env.RABBITMQ_INCREASE_STOCK as string;

async function increaseStock(CartItems: [CartItem]) {
  const count = await prisma.$transaction(
    CartItems.map(x => {
      return prisma.product.update({ where: { productId: x.productId }, data: { stock: { increment: x.quantity } } });
    }),
  );

  console.log(`${count} products stock increased `);
}

receiveMessage(RABBITMQ_INCREASE_STOCK, increaseStock);
