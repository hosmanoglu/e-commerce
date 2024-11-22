
import { receiveMessage } from '../rabbitmq/receiveMessage';
import { prisma } from '../db/prisma';
import { Product } from '@prisma/client';

const RABBITMQ_CATALOG_QUEUE = process.env.RABBITMQ_CATALOG_QUEUE as string;

async function insertProducts(products: [Product]) {
  const count = await prisma.product.createMany({ data: products });
  console.log(`${count.count} products created `);
}

receiveMessage(RABBITMQ_CATALOG_QUEUE, insertProducts);
