import { prisma } from './db/prisma';
import express from 'express';
import { cartController } from './controller/cart';
import { errorHandler } from './middlewares/errorHandler';


const app = express();

app.use(express.json());
app.use('/cart', cartController);

app.get('/', (req, res) => {
  res.status(200).send('Server is alive ');
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { app };
