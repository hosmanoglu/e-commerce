import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwksClient } from '../auth/jwksClient';

interface CustomRequest extends Request {
  user?: { id: string; admin: boolean };
}
const verifyToken = (token: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    jwt.verify(
      token,
      (await jwksClient.getSigningKey()).getPublicKey(),

      {
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      },
    );
  });
};

// JWT Middleware
const authenticateJWT = async (req: CustomRequest, res: Response): Promise<{ id: string; admin: boolean } | undefined> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token not provided' });
      return undefined;
    }

    try {
      const decoded = await verifyToken(token);
      req.user = decoded as CustomRequest['user'];
      return decoded as CustomRequest['user'];
    } catch (error) {
      res.sendStatus(403);
      return undefined;
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const authenticateAdmin = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const user = await authenticateJWT(req, res);
  if (user === undefined) {
    return;
  } else if (user?.admin) {
    next();
  } else {
    res.sendStatus(403);
  }
};

const authenticateUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const user = await authenticateJWT(req, res);
  if (user === undefined) {
    return;
  } else {
    next();
  }
};

export { authenticateAdmin, authenticateUser };
