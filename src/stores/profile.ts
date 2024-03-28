import {create} from 'zustand';

import {TempPropfile} from '@/types/profileType';

interface ProfileStore {
  profile: TempPropfile;
  setProfile: (profile: TempPropfile) => void;
  setProfileImage: (profileImage: File) => void;
  setChangeProfile: (targetElement: {name: string; value: string}) => void;
}

const initialProfile: TempPropfile = {
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
  isOtherProfile: false,
  isChangeProfile: false,
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
};

export const useProfileStore = create<ProfileStore>(set => ({
  profile: initialProfile,
  setProfile: (profile: TempPropfile) =>
    set({
      profile,
    }),
  setProfileImage: (profileImage: File) =>
    set(state => ({
      profile: {
        ...state.profile,
        isChangeProfile: true,
        profileImage,
      },
    })),
  setChangeProfile: (updateTarget: {name: string; value: string}) =>
    set(state => ({
      profile: {
        ...state.profile,
        isChangeProfile: true,
        [updateTarget.name]: updateTarget.value,
      },
    })),
}));
