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
  type: 'INTROTITLE' | 'ABOUTME' | 'LINK' | 'HASHTAG';
  content: string | null;
  isVisible: boolean;
  color: string;
}

export interface IProfileUpdate {
  profileImage: string;
  data: IProfileData;
}

export interface IProfileData {
  location: string;
  department: string;
  cards: IProfileCard[];
}
