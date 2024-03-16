import {customAxios} from './headers';

const fetcher = async (url: string) => {
  const res = await customAxios.get(url);
  return res.data;
};

export {fetcher};
