import {BadRequestError} from '@/shared/custom-error-handler';
import {db, redis} from '@/shared/db';
import {generateTokens} from '@/shared/token';
import {sendResponse} from '@/shared/utils';
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

export const createCodeBeforeSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email} = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const existingUser = await db.user.findUnique({
      where: {email},
    });

    if (existingUser && existingUser.isAuthenticated) {
      throw new BadRequestError(
        '이미 인증된 계정입니다.',
        'Controller/auth.controller.ts createCodeBeforeSignup() method error',
        {isAuthenticated: existingUser.isAuthenticated}
      );
    }

    await redis.set(`authCode:${email}`, code, 'EX', 180);

    await db.user.upsert({
      where: {
        email,
      },
      update: {
        code,
      },
      create: {
        email,
        code,
      },
    });

    sendResponse(
      res,
      StatusCodes.CREATED,
      {code},
      '인증 코드가 발송되었습니다.'
    );
  } catch (error) {
    next(error);
  }
};

export const signupORsignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email} = req.body;

    const userWithCode = await db.user.findUnique({
      where: {email},
    });

    if (!userWithCode)
      throw new BadRequestError(
        '해당 이메일로 가입한 정보를 찾을 수 없습니다.',
        'Controller/auth.controller signupORsignin() method error',
        null
      );

    await db.user.update({
      where: {email},
      data: {
        code: '',
        isAuthenticated: true,
      },
    });

    const {accessToken, refreshToken} = generateTokens({
      id: userWithCode.id,
      email: userWithCode.email,
    });

    await redis.set(
      `users:auth#${userWithCode.id}`,
      refreshToken,
      'EX',
      60 * 60 * 24 * 7
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
      secure: process.env.NODE_ENV === 'production',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      secure: process.env.NODE_ENV === 'production',
    });

    sendResponse(
      res,
      StatusCodes.CREATED,
      {accessToken},
      '유저가 정상적으로 인증 되었습니다.'
    );

    await redis.del(`authCode:${email}`);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req: Request, res: Response) => {
  const {email} = req.body;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!existingUser) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: '해당 이메일로 가입한 정보를 찾을 수 없습니다.',
      data: null,
    });
    console.log('Controller signout() method error');
    return;
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      isAuthenticated: false,
    },
  });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === 'production',
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(StatusCodes.OK).json({
    message: '유저가 로그아웃 되었습니다.',
    data: null,
  });
};
