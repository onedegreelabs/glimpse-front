export interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  profileImageUrl: string;
  introSnippet: string;
  department: string;
  location: string;
  belong: string;
  viewCount: number;
  cards: IProfileCard[];
}

export interface IProfileCard {
  id: number;
  type: 'INTROTITLE' | 'INTROCAREER' | 'ABOUTME' | 'LINK' | 'HASHTAG';
  content: string[];
  isVisible: boolean;
  color: string;
}

export interface IProfileUpdate {
  profileImage?: File;
  data: TUpdateProfile;
}

export interface IProfileSection {
  height: number;
  width: number;
  placeholder: string;
}

export interface ISection {
  title: string;
  sectionProp: IProfileSection[];
}

export interface ICombinedDataItem {
  title: string;
  content: IProfileCard[];
  cards: IProfileSection[];
}

export interface ILinkImg {
  alt: string;
  src: string;
}

type TUpdateProfile = Omit<
  IProfile,
  'firstName' | 'lastName' | 'profileImageUrl' | 'viewCount'
>;

export type TProfile = IProfile & {
  isOtherProfile: boolean;
  isChangeProfile: boolean;
  profileImage?: File;
};
