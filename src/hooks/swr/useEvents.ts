import {getFetcher} from '@/apis/fetcher';
import {customAxios} from '@/apis/headers';
import {
  QuestionType,
  CreateEventType,
  rsvpDataType,
  RequirementType,
} from '@/types/eventTypes';
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
  formData.append('data', JSON.stringify(data));
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

// rsvp question 가져오기
export const useEventQuestion = function (eventId: number) {
  const {data, error, isLoading} = useSWR(`events/${eventId}/rsvp`, getFetcher);

  return {data, error, isLoading};
};

export const saveRequirement = async function (
  eventId: number,
  data: RequirementType
) {
  const res = await customAxios.patch(`events/${eventId}/requirements`, data);
  return res;
};

// rsvp builder 저장
export const saveQuestion = async function (
  eventId: number,
  data: QuestionType
) {
  let res;
  if (data.maxCount === 0) {
    res = await customAxios.post(`events/${eventId}/question`, {
      type: 'Text',
      question: data.question,
      isRequired: data.isRequired,
    });
  } else {
    res = await customAxios.post(`events/${eventId}/question`, data);
  }
  return res;
};

// rsvp 신청 타입 그냥 임시. 바꿔야됨.
export const applyEvent = async function (eventId: number, data: rsvpDataType) {
  const res = await customAxios.post(`events/${eventId}/participants`, data);
  return res;
};
