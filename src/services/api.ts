import {
  axiosInstance,
  basicAuthInstance,
  socialAuthInstance,
  tokenValidInstance,
} from './headers';
import {IProfile, IProfileUpdate} from '@/types/profileType';
import {CreateEventType} from '@/types/eventCreate';

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

// profile api
export const profileApi = {
  getUserMe: async (): Promise<IProfile> => {
    const res = await tokenValidInstance().get('users/me');
    return res.data.data;
  },
  updateUserMe: async (updateUser: IProfileUpdate): Promise<void> => {
    const formData = new FormData();
    formData.append('profileImage', updateUser.profileImage as Blob);
    formData.append('data', JSON.stringify(updateUser.data));
    await tokenValidInstance().patch('/users/me', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getUserOther: async (id: number): Promise<IProfile> => {
    const res = await tokenValidInstance().get(`/users/other/${id}`);
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
