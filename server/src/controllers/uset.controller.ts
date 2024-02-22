import {db} from '@/shared/db';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

export const getCurrentUser = async (req: Request, res: Response) => {
  //@ts-ignore
  const {id} = req.currentUser;

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: '해당 유저 정보를 찾을 수 없습니다.',
      data: null,
    });
    console.log('Controller getCurrentUser() method error');
    return;
  }

  res.status(StatusCodes.OK).json({
    message: '유저가 정상적으로 불러와졌습니다.',
    data: {
      user,
    },
  });
};
