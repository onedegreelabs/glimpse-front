import { db } from '@/shared/db';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const createCodeBeforeSignup = async (req: Request, res: Response) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const existingUser = await db.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: '이미 해당 이메일로 가입된 정보가 존재합니다.', data: null });
    console.log('Middleware createCodeBeforeSignup() method error');
    return;
  }

  await db.user.create({
    data: {
      email,
      code
    }
  });

  res.status(StatusCodes.CREATED).json({ message: '인증 코드가 발송되었습니다.', data: { code } });
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, code } = req.body;

  const userWithCode = await db.user.findUnique({
    where: {
      email
    }
  });

  if (!userWithCode) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: '해당 이메일로 가입한 정보를 찾을 수 없습니다.', data: null });
    console.log('Middleware createCodeBeforeSignup() method error');
    return;
  }

  if (userWithCode.code !== code) {
    return res.status(400).json({ error: '잘못된 코드입니다.' });
  }

  const updatedUser = await db.user.update({
    where: { email },
    data: {
      name,
      code: ''
    }
  });

  res.status(StatusCodes.CREATED).json({
    message: '유저가 정상적으로 생성되었습니다.',
    data: updatedUser
  });
};
