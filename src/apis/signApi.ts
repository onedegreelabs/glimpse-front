import {basicAuthInstance, customAxios} from './headers';
export const sendMailWithCode = async (email: string) => {
  return await customAxios.post('auth/email/request-code', {
    email,
  });
};

export const verifyEmailCode = async (email: string, code: string) => {
  return await basicAuthInstance(email, code).post('auth/basic');
};
export const getAccessTokenByRefreshToken = async () => {
  return await customAxios.put('/auth/token');
};

export const logout = async () => {
  return await customAxios.delete('/auth/token');
};
