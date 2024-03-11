import {create} from 'zustand';

import {TProfile} from '@/types/profileType';

interface ProfileStore {
  profile: TProfile;
  setProfileImage: (profileImage: File) => void;
  setChangeProfile: (targetElement: {name: string; value: string}) => void;
}

const initialProfile: TProfile = {
  id: 1,
  firstName: '테',
  lastName: '스트',
  displayName: '없어질수도',
  profileImageUrl: '',
  introSnippet: '하이',
  department: '',
  location: 'Seoul, Korea',
  belong: '글림스',
  viewCount: 0,
  cards: [],
  isOtherProfile: false,
  isChangeProfile: false,
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
