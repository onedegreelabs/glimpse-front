import {create} from 'zustand';

const initialProfile = {
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

const initialUpdateProfile = {
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

interface ProfileStore {
  profile: any;
  updateProfile: any;
  setProfile: (profile: any) => void;
  setProfileImage: (profileImage: File) => void;
  setChangeProfile: (targetElement: {name: string; value: string}) => void;
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
