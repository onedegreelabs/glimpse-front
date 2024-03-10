import {axiosInstance, customAxios, tokenValidInstance} from './headers';

import {CreateEventType} from '@/containers/events/create/type';
export const eventsAPI = {
  create: {
    createEvent: async (imgFile: File | undefined, params: CreateEventType) => {
      const {organizationId} = params;
      const formData = new FormData();
      if (imgFile) {
        formData.append('eventCoverImage', imgFile);
      }
      formData.append('data', JSON.stringify(params));
      return await tokenValidInstance().post(
        `organizations/${organizationId}/events`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    },
  },
  detail: {
    getEventList: async (eventId: number) => {
      const res = await axiosInstance().get(`events/${eventId}`);
      return res;
    },
    getEventUserList: async (eventId: number) => {
      const res = await axiosInstance().get(`events/${eventId}/members`);
      return res;
    },
  },
  my: {
    getMyEventList: async (count: number) => {
      const res = await customAxios.get(`events/my-events?take=${count}`);
      return res;
    },
  },
  getAllEvents: async (url: string) => {
    const res = await customAxios.get(url);
    return res;
  },
};
