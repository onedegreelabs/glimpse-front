import {getCurrentUser} from '@/controllers/uset.controller';
import {Router} from 'express';

const router: Router = Router();

export const userRoutes = () => {
  router.get('/current-user', getCurrentUser);

  return router;
};
