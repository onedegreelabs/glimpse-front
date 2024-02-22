import {
  createCodeBeforeSignup,
  signout,
  signupORsignin,
} from '@/controllers/auth.controller';
import {verifyAuthCodeFromHeader} from '@/middleware/auth.middleware';
import {Router} from 'express';

const router: Router = Router();

export const authRoutes = () => {
  router.post('/auth-check', createCodeBeforeSignup);
  router.post('/signup-or-signin', verifyAuthCodeFromHeader, signupORsignin);
  router.post('/signout', signout);

  return router;
};
