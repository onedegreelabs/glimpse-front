import { BadRequestError } from '@/shared/custom-error-handler';
import { db } from '@/shared/db';
import { hashPassword } from '@/shared/utils';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await db.user.findUnique({
    where: {
      email
    }
  });
  if (existingUser) {
    return new BadRequestError('이미 해당 이메일로 가입된 정보가 존재합니다.', 'Controller signup() method error');
  }

  const hashedPassword = await hashPassword(password);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  res.status(StatusCodes.CREATED).json({
    message: '유저가 정상적으로 생성되었습니다.',
    data: user
  });
};
