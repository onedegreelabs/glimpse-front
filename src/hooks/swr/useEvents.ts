import {getFetcher} from '@/services/fetcher';
import {customAxios} from '@/services/headers';
import {CreateEventType} from '@/types/eventTypes';
import useSWR from 'swr';

const useMyEventList = function (count: number) {
  const {data, error, isLoading} = useSWR(
    `events/my-events?take=${count}`,
    getFetcher
  );

  return {data, error, isLoading};
};

export {useMyEventList};

const createEvent = async function (data: CreateEventType) {
  const res = await customAxios.post('events', data);
  return res;
};

export {createEvent};
