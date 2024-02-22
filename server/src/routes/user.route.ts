import {verifyUserToken} from '@/controllers/uset.controller';
import {Router} from 'express';

const router: Router = Router();

export const userRoutes = () => {
  router.get('/verify-token', verifyUserToken);

  return router;
};
