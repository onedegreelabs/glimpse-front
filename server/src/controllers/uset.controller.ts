import {BadRequestError} from '@/shared/custom-error-handler';
import {db} from '@/shared/db';
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

export const verifyUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  const id = req.user.id;

  try {
    const user = await db.user.findUnique({
      where: {id},
    });

    if (!user)
      throw new BadRequestError(
        '해당 이메일로 가입한 정보를 찾을 수 없습니다.',
        'Controller/user.controller verifyUserToken() method error',
        null
      );

    res.status(StatusCodes.OK).json({
      message: '유저를 성공적으로 불러왔습니다.',
      user: {
        id: user.id,
        email: user.email,
        isAuthenticated: user.isAuthenticated,
      },
    });
  } catch (error) {
    next(error);
  }
};
