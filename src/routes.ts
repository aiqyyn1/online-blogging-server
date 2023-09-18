import { Router } from 'express';
import { createPost } from './controllers/auth.controller';
import { upload } from './middlewares/post.middleware';

export const routes = (router: Router) => {
  router.post('/api/create', upload.single('images'), createPost);
};
