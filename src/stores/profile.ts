import {create} from 'zustand';

import {
  TProfile,
  UpdateProfileCardDto,
  UpdateUserDtoRequest,
} from '@/types/profileType';
import {
  initialProfile,
  initialUpdateProfile,
} from '@/containers/my/profile/constans/profile';

interface ProfileStore {
  profile: TProfile;
  updateProfile: UpdateUserDtoRequest;
  setProfile: (profile: TProfile) => void;
  setProfileImage: (profileImage: File) => void;
  setChangeProfile: (targetElement: {name: string; value: string}) => void;
  // setChangeProfileCard: (cards: UpdateProfileCardDto[]) => void;
}

export const useProfileStore = create<ProfileStore>(set => ({
  profile: initialProfile,
  updateProfile: initialUpdateProfile,
  setProfile: (profile: TProfile) =>
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
  // setChangeProfileCard: (cards: UpdateProfileCardDto[]) =>
  //   set(state => ({
  //     updateProfile: {
  //       ...state.updateProfile,
  //       isChangeProfile: true,
  //       profileCard: cards,
  //     },
  //   })),
}));
