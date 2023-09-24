import { Router } from 'express';
import {
  AuthenticatedUser,
  Login,
  Register,
  createPost,
} from './controllers/auth.controller';
import { upload } from './middlewares/post.middleware';
import { AuthMiddleWare } from './middlewares/auth.middleware';

export const routes = (router: Router) => {
  router.post('/api/create', upload.single('images'), createPost);
  router.post('/api/register', Register);
  router.post('/api/login', Login);
  router.get('/api/user', AuthMiddleWare, AuthenticatedUser);
};
