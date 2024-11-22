import { Router } from 'express';
import jose from 'node-jose';
const PUBLIC_KEY = process.env.PUBLIC_KEY  as string;
const authController = Router();
const keyStore = jose.JWK.createKeyStore();
const key = keyStore.add(PUBLIC_KEY, 'pem', { kid: '12345', use: 'sig', alg: 'RS256' });
let keys!:object;

authController.get('/jwks', async (req, res, next) => {
  try {
    if (!keys) {
      await key;
      keys = keyStore.toJSON();
    }

    res.json(keys);
  } catch (error) {
    next(error);
  }
});

export { authController };
