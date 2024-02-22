import {
  BadRequestError,
  NotAuthorizedError,
} from '@/shared/custom-error-handler';
import {db, redis} from '@/shared/db';
import {config} from '@/config';
import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new NotAuthorizedError(
        'AccessToken이 유효하지 않습니다',
        'Middleware verifyToken() method error'
      );
    }

    const accessToken = authHeader.split(' ')[1];

    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET!);
    //@ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
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

    const redisCode = await redis.get(`authCode:${email}`);
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    console.log(user);

    if (!user)
      throw new BadRequestError(
        '해당 이메일로 가입한 정보를 찾을 수 없습니다.',
        'Middleware/auth.middleware verifyAuthCodeFromHeader() method error',
        null
      );
    const dbCode = user.code;

    const storedCode = redisCode ? redisCode : dbCode;
    console.log(dbCode);

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
