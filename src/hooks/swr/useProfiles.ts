import {getFetcher} from '@/apis/fetcher';
import useSWR from 'swr';

export const useMyProfile = () => {
  const {data, error, isLoading} = useSWR('/users/me', getFetcher);
  return {data, error, isLoading};
};
