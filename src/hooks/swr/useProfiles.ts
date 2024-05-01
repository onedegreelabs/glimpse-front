import {getFetcher} from '@/apis/fetcher';
import useSWR from 'swr';
import {customAxios} from '@/apis/headers';

export const useMyProfile = () => {
  const {data, error, isLoading} = useSWR('/users/me', getFetcher);
  return {data, error, isLoading};
};

export const updateMyProfile = async function (params: any) {
  const res = await customAxios.patch(`users/${params.userId}`, params);
  return res;
};
