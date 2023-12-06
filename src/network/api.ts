import {axiosInstance} from './headers';

export const sendMailWithCode = async (email: string) => {
  try {
    const response = await axiosInstance.post('/mails/code/', {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send mail with code');
  }
};

export const verifyEmailCode = async (email: string, code: string) => {
  try {
    const response = await axiosInstance.post('/auth/email/', {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to verify code');
  }
};
