import { NotAuthorizedError } from '@/shared/custom-error-handler';
import { verifyJWT } from '@/shared/token';
import { NextFunction, Request, Response } from 'express';

export const authenticateUser = (req: Request, _res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) throw new NotAuthorizedError('인증 오류', 'Middleware authenticateUser() method error');

  try {
    const { id, name, email } = verifyJWT(token);
    req.currentUser = { id, name, email };
    next();
  } catch (error) {
    throw new NotAuthorizedError('인증 오류', 'Middleware authenticateUser() method error');
  }
};
