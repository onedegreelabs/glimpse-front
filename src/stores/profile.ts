import {create} from 'zustand';
import {
  initialProfile,
  initialUpdateProfile,
} from '@/containers/my/profile/constans/profile';

interface ProfileStore {
  profile: any;
  updateProfile: any;
  setProfile: (profile: any) => void;
  setProfileImage: (profileImage: File) => void;
  setChangeProfile: (targetElement: {name: string; value: string}) => void;
  // setChangeProfileCard: (cards: UpdateProfileCardDto[]) => void;
}

export const useProfileStore = create<ProfileStore>(set => ({
  profile: initialProfile,
  updateProfile: initialUpdateProfile,
  setProfile: (profile: any) =>
    set(state => ({
      ...state.profile,
      profile,
    })),
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
