import { customAxios } from './headers';

export const checkAuth = async ({ email }: { email: string }) => {
  const { data } = await customAxios.post('/auth-check', { email });
  return data;
};

export const signup = async ({ email, code }: { email: string; code: string }) => {
  const { data } = await customAxios.post('signup', { email, code });
  return data;
};
