import express from 'express';
import { prisma } from './db/prisma';
import { catalogController } from './controller/product';
import { errorHandler } from './middlewares/errorHandler';
import { stockController } from './controller/stock';

const app = express();

app.use(express.json());
app.use('/products', catalogController);
app.use('/stocks', stockController);

app.get('/', (req, res) => {
  res.status(200).send('Server is alive ');
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  require('./consumer/insertProducts');
  require('./consumer/decreaseStock');
  require('./consumer/increaseStock');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { app };
