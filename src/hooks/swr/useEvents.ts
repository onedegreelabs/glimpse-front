import {fetcher} from '@/services/fetcher';
import useSWR from 'swr';

const useMyEventList = function (count: number) {
  const {data, error, isLoading} = useSWR(
    `events/my-events?take=${count}`,
    fetcher
  );

  return {data, error, isLoading};
};

export {useMyEventList};
