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

const useEventList = function (count: number) {
  const {data, error, isLoading} = useSWR(`events?take=${count}`, getFetcher);

  return {data, error, isLoading};
};

export {useEventList};

const createEvent = async function (data: CreateEventType, imgFile: any) {
  const formData = new FormData();
  if (imgFile) {
    formData.append('eventImage', imgFile);
  }
  formData.append('data', new Blob([JSON.stringify(data)]));
  const res = await customAxios.post('events', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export {createEvent};

const checkDuplicateHandle = async function (handle: string) {
  const res = await customAxios.get(`events/check-duplicate?handle=${handle}`);
  return res;
};

export {checkDuplicateHandle};

const useEventDetail = function (handle: string) {
  const {data, error, isLoading} = useSWR(
    `events/handle/${handle}`,
    getFetcher
  );

  return {data, error, isLoading};
};

export {useEventDetail};

const useEventUser = function (eventId: number) {
  const {data, error, isLoading} = useSWR(
    `events/${eventId}/participants`,
    getFetcher
  );

  return {data, error, isLoading};
};

export {useEventUser};
