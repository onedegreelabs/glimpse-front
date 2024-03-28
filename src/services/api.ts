import {
  axiosInstance,
  basicAuthInstance,
  socialAuthInstance,
  tokenValidInstance,
} from './headers';
import {IProfile, IProfileUpdate} from '@/types/profileType';
import {CreateEventType} from '@/containers/events/create/type';

export const sendMailWithCode = async (email: string) => {
  return await axiosInstance().post('mails/code', {
    email,
  });
};

export const verifyEmailCode = async (email: string, code: string) => {
  return await basicAuthInstance(email, code).post('auth/basic');
};

export const loginWithGoogle = async (googleToken: string) => {
  return await socialAuthInstance(googleToken).post('auth/google');
};

export const loginWithLinkedin = async () => {
  return await axiosInstance().get('auth/linkedin');
};

// events
export const events = {
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
};
