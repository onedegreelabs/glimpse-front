import { createCodeBeforeSignup, signup } from '@/controllers/auth.controller';
import { Router } from 'express';

const router: Router = Router();

export const authRoutes = () => {
  router.post('/auth-check', createCodeBeforeSignup);
  router.post('/signup', signup);

  return router;
};
