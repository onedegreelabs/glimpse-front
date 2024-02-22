import * as bcrypt from 'bcrypt';
import {Response} from 'express';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export const sendResponse = (
  res: Response,
  statusCode: number,
  data: object,
  message?: string
) => {
  res.status(statusCode).json({
    message,
    data,
  });
};
