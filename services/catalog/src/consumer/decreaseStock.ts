import { receiveMessage } from '../rabbitmq/receiveMessage';
import { prisma } from '../db/prisma';
import { CartItem } from '../types/cart';

const RABBITMQ_DECRASE_STOCK = process.env.RABBITMQ_DECRASE_STOCK as string;

async function decreaseStock(CartItems: CartItem[]) {
  let promisies = CartItems.map(x => {
    return prisma.product.update({ where: { productId: x.productId }, data: { stock: { decrement: x.quantity } } });
  });
  console.log(promisies)

  const count = await prisma.$transaction(promisies);

  console.log(`${count} products stock decreased `);
}

receiveMessage(RABBITMQ_DECRASE_STOCK, decreaseStock);
