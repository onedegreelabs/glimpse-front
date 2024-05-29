import {getFetcher2} from '@/apis/fetcher';
import useSWR from 'swr';

export const useEventData = function () {
  const {data, error, isLoading} = useSWR(
    '/communities/25/events?take=100',
    getFetcher2
  );

  return {data, error, isLoading};
};

export const useEventDetail2 = function (eventHandle: string) {
  const {data, error, isLoading} = useSWR(
    `/events/${eventHandle}`,
    getFetcher2
  );

  return {data, error, isLoading};
};

export const useEventUser2 = function (eventId: number, count: number) {
  const {data, error, isLoading} = useSWR(
    `/events/${eventId}/members?take=${count}`,
    getFetcher2
  );

  return {data, error, isLoading};
};
