import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const PUBLIC_KEY = process.env.PUBLIC_KEY ?? 'asd-file';

interface CustomRequest extends Request {
  user?: { id: string; admin: boolean };
}
const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, PUBLIC_KEY, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

const authenticateJWT = async (
  req: CustomRequest,
  res: Response,
): Promise<{ id: string; admin: boolean } | undefined> => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = await verifyToken(token);
      req.user = decoded as CustomRequest['user'];
      return decoded as CustomRequest['user'];
    } catch (error) {
      res.sendStatus(403);
      return undefined;
    }
  } else {
    res.sendStatus(401);
    return undefined;
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
