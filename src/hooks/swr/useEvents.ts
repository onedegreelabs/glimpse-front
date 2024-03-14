import {customAxios} from '@/services/headers';
import useSWR from 'swr';

const useMyEventList = function (count: number) {
  const fetcher = async function () {
    const res = await customAxios.get(`events/my-events?take=${count}`);
    return res.data;
  };

  const {data, error, isLoading} = useSWR(
    `events/my-events?take=${count}`,
    fetcher
  );

  return {data, error, isLoading};
};

export {useMyEventList};
