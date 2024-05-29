import {customAxios, customAxios2} from './headers';

const getFetcher = async (url: string) => {
  const res = await customAxios.get(url);
  return res.data;
};

export {getFetcher};

export const getFetcher2 = async (url: string) => {
  const res = await customAxios2.get(url);
  return res.data;
};

const postFetcher = async (url: string) => {
  const res = await customAxios.post(url);
  return res.data;
};

export {postFetcher};
