import { User } from '@prisma/client';
import { receiveMessage } from '../rabbitmq/receiveMessage';
import { prisma } from '../db/prisma';

const RABBITMQ_USER_QUEUE = process.env.RABBITMQ_USER_QUEUE as string;

async function insertUser(users: [User]) {
  const count = await prisma.user.createMany({ data: users ,skipDuplicates: true});
  console.log(`${count.count} users created `);
}

receiveMessage(RABBITMQ_USER_QUEUE, insertUser);
