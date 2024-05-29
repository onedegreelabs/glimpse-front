interface Location {
  detailAddress: string;
  id: number;
  longAddress: string;
  placeId: string;
  shortAddress: string;
}

interface Organizer {
  // 필드의 구조에 따라 정의합니다. 예시로 name과 id를 포함했습니다.
  name: string;
  id: number;
  profileImage: string;
}

interface PreviewAttendee {
  // 필드의 구조에 따라 정의합니다. 예시로 name과 id를 포함했습니다.
  name: string;
  id: number;
}

export interface EventDataType2 {
  coverImage: string;
  type: string;
  description: string;
  dueAt: string;
  endAt: string;
  handle: string;
  id: number;
  location: Location;
  externalLink: string;
  organizers: Organizer[];
  previewAttendees: PreviewAttendee[];
  price: number;
  startAt: Date;
  subTitle: string;
  tags: string[];
  title: string;
  totalAttendees: number;
  viewCounts: number;
}

interface Tag {
  id: number;
  name: string;
}

interface SocialLink {
  id: number;
  url: string;
  ogTitle: string | null;
  ogImage: string | null;
}

export interface eventUserDataType2 {
  id: number;
  name: string;
  email: string;
  profileImage: string | null;
  bio: string;
  belong: string;
  position: string;
  specialization: string;
  isAuthorized: boolean;
  handle: string;
  roleType: string;
  isAttending: boolean;
  location: string | null;
  tags: Tag[];
  socialLinks: SocialLink[];
}

export interface DayEventProps2 {
  date: string;
  events: EventDataType2[];
}
