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

export interface ILinkImg {
  alt: string;
  src: string;
}

interface BasicDate {
  createdAt?: string;
  updatedAt?: string;
}

export type TProfile = ProfileDto & {
  isOtherProfile: boolean;
  isChangeProfile: boolean;
};

export interface ProfileDto extends BasicDate {
  id: number;
  email: string;
  regionId: string;
  department: string;
  familyName: string;
  givenName: string;
  introduction: string;
  belong: string;
  role: string;
  image: string;
  sns: SnsDto[];
  authentication: {};
  profileCard: ProfileCardDto[];
  userTag: string[];
}

export interface SnsDto extends BasicDate {
  id: number;
  type: string;
  account: string;
}

export interface ProfileCardDto extends BasicDate {
  id: number;
  userId?: number;
  type: string;
  content: string;
}
export interface GetUserResponseDto {
  status: number;
  data: ProfileDto;
}

export interface UpdateUserDtoRequest {
  region: string;
  department: string;
  familyName: string;
  givenName: string;
  introduction: string;
  belong: string;
  role: string;
  sns: string[];
  profileCard: UpdateProfileCardDto[];
  userTag: string[];
}

export type UpdateProfileCardDto = Pick<
  ProfileCardDto,
  'id' | 'type' | 'content'
>;
