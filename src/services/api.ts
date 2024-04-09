import {
  axiosInstance,
  basicAuthInstance,
  customAxios,
  socialAuthInstance,
  tokenValidInstance,
} from './headers';
import {IProfile} from '@/types/profileType';
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

export const getAccessTokenByRefreshToken = async () => {
  return await customAxios.put('/auth/token');
};

export const logout = async () => {
  return await customAxios.delete('/auth/token');
};

// profile api
export const profileApi = {
  getUserMe: async (): Promise<IProfile> => {
    const res = await tokenValidInstance().get('users/me');
    return res.data.data;
  },
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
