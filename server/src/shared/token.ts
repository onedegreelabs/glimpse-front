import {config} from '@/config';
import jwt from 'jsonwebtoken';

type CreateJwtType = {
  id: number;
  email: string;
};

export const generateTokens = (payload: CreateJwtType) => {
  const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET!, {
    expiresIn: '1d',
  });
  const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });

  return {accessToken, refreshToken};
};
