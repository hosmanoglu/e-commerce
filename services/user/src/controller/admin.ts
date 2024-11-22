import { Router } from 'express';
import { prisma } from '../db/prisma';
import bcrypt from 'bcryptjs';
import { validateRequest } from '../middlewares/validation';
import { usersValidationRules } from '../validators/userValidation';
import { authenticateAdmin } from '../middlewares/authenticate';
import { sendMessage } from '../rabbitmq/sendMessage';

const RABBITMQ_USER_QUEUE = process.env.RABBITMQ_USER_QUEUE as string;

const adminController = Router();

adminController.post('/create', authenticateAdmin, validateRequest(usersValidationRules), async (req, res, next) => {
  try {
    const { users } = req.body;

    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await sendMessage(RABBITMQ_USER_QUEUE, users);


    res.json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
});

adminController.get('/', authenticateAdmin, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true } });

    res.json(users);
  } catch (error) {
    next(error);
  }
});

adminController.get('/:id', authenticateAdmin, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id }, select: { id: true, email: true } });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

adminController.delete('/:id', authenticateAdmin, async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });

    res.json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
});

export { adminController };
