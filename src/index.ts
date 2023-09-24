require('dotenv').config()
import express from 'express';
import { routes } from './routes';
import { createConnection } from 'typeorm';
import cors from 'cors';
import cookieParser from 'cookie-parser';

createConnection().then((connect) => {
  const app = express();
  const port = 8080;
  app.use(express.json());
  app.use(cookieParser())
  routes(app);
  app.use(
    cors({
      credentials: true,
      origin: '*',
    })
  );
  app.listen(port, () => {
    console.log('Server is running on port 8080');
  });
});
