import {axiosInstance} from './headers';

export const sendMailWithCode = async (email: string) => {
  return await axiosInstance.post('mails/code/', {
    email,
  });
};

export const verifyEmailCode = async (email: string, code: string) => {
  return await axiosInstance.post('auth/email/', {
    email,
    code,
  });
};

interface CreateEventType {
  organizationId: number;
  title: string;
  type: string;
  visibility: string;
  startDate: string;
  endDate: string;
  location: string;
  link: string;
  handle: string;
  description: string;
  tags: string[];
}
export const createEvent = async (params: CreateEventType) => {
  const {
    organizationId,
    title,
    type,
    visibility,
    startDate,
    endDate,
    location,
    link,
    handle,
    description,
    tags,
  } = params;
  return await axiosInstance.post('events', {
    organizationId,
    title,
    type,
    visibility,
    startDate,
    endDate,
    location,
    link,
    handle,
    description,
    tags,
  });
};
