import {axiosInstance} from '@/services/headers';

const tmpLogin = async () => {
  const res = await axiosInstance().get('auth/token');
  return res;
};

export {tmpLogin};
