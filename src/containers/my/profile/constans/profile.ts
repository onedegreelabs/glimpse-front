import {TProfile, UpdateUserDtoRequest} from '@/types/profileType';

export const linkImg = [
  {
    alt: 'github',
    src: '/assets/favicon/github.svg',
  },
  {
    alt: 'facebook',
    src: '/assets/favicon/facebook.jpg',
  },
  {
    alt: 'dribble',
    src: '/assets/favicon/dribble.jpg',
  },
  {
    alt: 'instagram',
    src: '/assets/favicon/instagram.svg',
  },
  {
    alt: 'linkedin',
    src: '/assets/favicon/linkedin.jpg',
  },
  {
    alt: 'medium',
    src: '/assets/favicon/medium.jpg',
  },
];

export const INTROTITLE = 'INTROTITLE';
export const INTROCAREER = 'INTROCAREER';
export const ABOUTME = 'ABOUTME';
export const LINK = 'LINK';
export const HASHTAG = 'HASHTAG';

export const DEPARTMENT = [
  'Engineering',
  'Product',
  'Business',
  'Marketing',
  'Finance',
  'Developer Relation',
  'Customer Experience',
  'Operation',
  'Design',
  'Other',
];

export const initialProfile: TProfile = {
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

export const initialUpdateProfile: UpdateUserDtoRequest = {
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
