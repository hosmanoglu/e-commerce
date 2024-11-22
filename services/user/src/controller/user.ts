import { Router } from 'express';
import { prisma } from '../db/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validation';
import { userValidationRules } from '../validators/userValidation';

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

const userController = Router();

userController.post('/register', validateRequest(userValidationRules), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isExist = await prisma.user.findUnique({ where: { email } });
    if (isExist) {
      res.status(409).json({ message: 'User already registered' });
    }

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.json({ email: user.email });
  } catch (error) {
    next(error);
  }
});

userController.post('/login', validateRequest(userValidationRules), async (req, res, next): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, admin: user.admin }, PRIVATE_KEY, { algorithm: 'RS256' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export { userController };
