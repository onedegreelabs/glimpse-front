import {
  GetUserResponseDto,
  IProfile,
  IProfileUpdate,
} from '@/types/profileType';
import {axiosInstance, tokenValidInstance} from './headers';

// profile api
export const getUserMe = async (): Promise<IProfile> => {
  const res = await tokenValidInstance().get('users/me');
  return res.data.data;
};

export const updateUserMe = async (
  updateUser: IProfileUpdate
): Promise<void> => {
  const formData = new FormData();
  formData.append('profileImage', updateUser.profileImage as Blob);
  formData.append('data', JSON.stringify(updateUser.data));
  await tokenValidInstance().patch('/users/me', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getUserOther = async (id: number): Promise<GetUserResponseDto> => {
  const res = await axiosInstance().get(`/users/${id}`);
  return res.data;
};
