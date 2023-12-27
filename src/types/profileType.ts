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
  content: string[] | string | null;
  isVisible: boolean;
  color: string;
}

type updateProfile = Omit<
  IProfile,
  'firstName' | 'lastName' | 'profileImageUrl' | 'viewCount'
>;

export interface IProfileUpdate {
  profileImage: string;
  data: updateProfile;
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
