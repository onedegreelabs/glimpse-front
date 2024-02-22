import {NotAuthorizedError} from '@/shared/custom-error-handler';
import {redis} from '@/shared/db';
import {verifyJWT} from '@/shared/token';
import {NextFunction, Request, Response} from 'express';

export const authenticateUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.cookies?.token)
    throw new NotAuthorizedError(
      '인증 오류',
      'Middleware authenticateUser() method error'
    );

  const {token} = req.cookies;

  try {
    const {id, name, email} = verifyJWT(token);
    //@ts-ignore
    req.currentUser = {id, name, email};
    //@ts-ignore
    console.log(req.currentUser);

    next();
  } catch (error) {
    throw new NotAuthorizedError(
      '인증 오류',
      'Middleware authenticateUser() method error'
    );
  }
};

export const verifyAuthCodeFromHeader = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new NotAuthorizedError(
        'Authorization 헤더가 누락되었습니다.',
        'Middleware/auth.middleware verifyAuthCodeFromHeader() method error'
      );

    const encoded = authHeader.split(' ')[1];
    const decoded = Buffer.from(encoded, 'base64').toString();
    const [email, code] = decoded.split(':');

    const storedCode = await redis.get(`authCode:${email}`);
    if (!storedCode || storedCode !== code)
      throw new NotAuthorizedError(
        '인증 코드가 유효하지 않거나 만료되었습니다.',
        'Middleware/auth.middleware verifyAuthCodeFromHeader() method error'
      );

    req.body.email = email;
    next();
  } catch (error) {
    next(error);
  }
};
