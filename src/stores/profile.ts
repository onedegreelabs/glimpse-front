import {create} from 'zustand';

import {IProfile} from '@/types/profileType';

interface ProfileStore {
  profile: IProfile;
  profileImage?: File;
  setProfileImage: (profileImage: File) => void;
}

const initialProfile = {
  profile: {
    id: 1,
    firstName: '테',
    lastName: '스트',
    displayName: '없어질수도',
    profileImageUrl: '',
    introSnippet: '하이',
    department: '개발자',
    location: '서울',
    belong: '글림스',
    viewCount: 0,
    cards: [],
  },
};

export const useProfileStore = create<ProfileStore>(set => ({
  ...initialProfile,
  setProfileImage: (profileImage: File) =>
    set(state => ({...state, profileImage})),
}));
