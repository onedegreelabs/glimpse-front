import {axiosInstance} from './headers';

export const sendMailWithCode = async (email: string) => {
  return await axiosInstance.post('/mails/code/', {
    email,
  });
};

export const verifyEmailCode = async (email: string, code: string) => {
  return await axiosInstance.post('/auth/email/', {
    email,
    code,
  });
};
