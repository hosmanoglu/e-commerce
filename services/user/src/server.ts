import express from 'express';
import { adminController } from './controller/admin';
import { userController } from './controller/user';
import { errorHandler } from './middlewares/errorHandler';
import { authController } from './controller/auth';

const app = express();

app.use(express.json());
app.use('/users', userController);
app.use('/admin/users', adminController);
app.use('/auth', authController);

app.get('/', (req, res) => {
  res.status(200).send('Server is alive ');
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  require('./consumer/insertUser');
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} 

export { app };
