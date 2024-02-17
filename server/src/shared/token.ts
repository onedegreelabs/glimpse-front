import { config } from '@/config';
import jwt from 'jsonwebtoken';

type CreateJwtType = {
  id: string;
  email: string;
  name: string;
};

type JwtPayload = {
  id: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
};

export const createJWT = ({ id, email, name }: CreateJwtType) => {
  const token = jwt.sign({ id, email, name }, config.JWT_TOKEN!, {
    expiresIn: '7d'
  });
  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, config.JWT_TOKEN!) as JwtPayload;
  return decoded;
};
