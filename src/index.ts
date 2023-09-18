import express from 'express';
import { routes } from './routes';
import { createConnection } from 'typeorm';
import cors from 'cors';

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'aikyn777',
  database: 'post',
  synchronize: true,
  entities: ['src/entity/*.ts'],
}).then((connect) => {
  const app = express();
  const port = 8080;
  app.use(express.json());
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
