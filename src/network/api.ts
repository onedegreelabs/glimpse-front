import {
  axiosInstance,
  basicAuthInstance,
  socialAuthInstance,
  tokconfigalidInstance,
} from './headers';
import {GetProfileResponseDto, IProfileUpdate} from '@/types/profileType';
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

// eventCreate
export const eventCreate = {
  createEvent: async (imgFile: File | undefined, params: CreateEventType) => {
    const {organizationId} = params;
    const formData = new FormData();
    if (imgFile) {
      formData.append('eventCoverImage', imgFile);
    }
    formData.append('data', JSON.stringify(params));
    return await tokconfigalidInstance().post(
      `organizations/${organizationId}/events`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },
};

// profile api
export const profileApi = {
  getUserMe: async (): Promise<GetProfileResponseDto> => {
    const res = await tokconfigalidInstance().get('users/me');
    return res.data.data;
  },
  updateUserMe: async (updateUser: IProfileUpdate): Promise<void> => {
    const formData = new FormData();
    formData.append('profileImage', updateUser.profileImage as Blob);
    formData.append('data', JSON.stringify(updateUser.data));
    await tokconfigalidInstance().patch('/users/me', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getUserOther: async (id: number): Promise<GetProfileResponseDto> => {
    const res = await tokconfigalidInstance().get(`/users/other/${id}`);
    return res.data.data;
  },
};

// glimpseList
export const glimpseList = {
  getEventList: async (eventId: number) => {
    const res = await axiosInstance().get(`events/${eventId}`);
    return res;
  },
  getEventUserList: async (eventId: number) => {
    const res = await axiosInstance().get(`events/${eventId}/members`);
    return res;
  },
};
