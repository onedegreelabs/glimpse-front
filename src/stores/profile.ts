import {create} from 'zustand';

import {TempPropfile} from '@/types/profileType';

interface ProfileStore {
  profile: TempPropfile;
  setProfileImage: (profileImage: File) => void;
  setChangeProfile: (targetElement: {name: string; value: string}) => void;
}

const initialProfile: TempPropfile = {
  id: 1,
  familyName: '테',
  givenName: '스트',
  image: '',
  introduction: '하이',
  department: '',
  regionId: 1,
  belong: '글림스',
  isOtherProfile: false,
  isChangeProfile: false,
  email: 'moniyel@gmail.com',
  role: '프론트',
  sns: [
    {
      createdAt: '',
      updatedAt: '',
      id: 1,
      type: 'test',
      account: 'moniyel@gmail.com',
    },
  ],
  authentication: {},
  profileCard: ['gam', 'www'],
  userTag: ['강아지', '고양이'],
};

export const useProfileStore = create<ProfileStore>(set => ({
  profile: initialProfile,
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
