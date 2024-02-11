import {customAxios} from '@/lib/utils';

export const getCurrentUser = async () => {
  const {data} = await customAxios.get('/auth');
  return data;
};
