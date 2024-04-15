import {customAxios} from './headers';
import {CreateEventType} from '@/app/events/new/type';
export const eventsAPI = {
  create: {
    createEvent: async (imgFile: File | undefined, params: CreateEventType) => {
      const {organizationId} = params;
      const formData = new FormData();
      if (imgFile) {
        formData.append('eventCoverImage', imgFile);
      }
      formData.append('data', JSON.stringify(params));
      return await customAxios.post(
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
      const res = await customAxios.get(`events/${eventId}`);
      return res;
    },
    getEventUserList: async (eventId: number) => {
      const res = await customAxios.get(`events/${eventId}/members`);
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
