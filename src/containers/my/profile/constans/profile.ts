import {TProfile, UpdateUserDtoRequest} from '@/types/profileType';

export const initialProfile: TProfile = {
  createdAt: '',
  updatedAt: '',
  id: 1,
  familyName: '',
  givenName: '',
  image: '',
  introduction: '',
  department: '',
  regionId: '',
  belong: '',
  email: '',
  role: '',
  sns: [
    {
      createdAt: '',
      updatedAt: '',
      id: 1,
      type: '',
      account: '',
    },
  ],
  authentication: {},
  profileCard: [],
  userTag: [],
  isChangeProfile: false,
  isOtherProfile: false,
};

export const initialUpdateProfile: UpdateUserDtoRequest = {
  familyName: '',
  givenName: '',
  introduction: '',
  department: '',
  region: '',
  belong: '',
  role: '',
  sns: [],
  profileCard: [],
  userTag: [],
};
