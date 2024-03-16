import {customAxios} from './headers';

const getFetcher = async (url: string) => {
  const res = await customAxios.get(url);
  return res.data;
};

export {getFetcher};

const postFetcher = async (url: string) => {
  const res = await customAxios.post(url);
  return res.data;
};

export {postFetcher};
