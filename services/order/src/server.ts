import express from 'express';
import { orderController } from './controller/order';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use('/order', orderController);

app.get('/', (req, res) => {
  res.status(200).send('Server is alive ');
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {

  const PORT = process.env.PORT || 3003;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { app };
