import {SnsType} from './profileType';

export interface CreateEventType {
  title: string;
  startAt: Date;
  endAt: Date;
  dueAt: Date;
  type: String;
  handle: String;
  region: String;
  detailAddress: String;
  externalLink: String;
  description: String;
  coverImageKey?: File | string;
}

interface regionType {
  oneDepth: string;
  twoDepth: string;
  threeDepth: string;
}

export interface EventDataType {
  title: string;
  startAt: Date;
  endAt: Date;
  type: string;
  handle: string;
  externalLink: string;
  detailAddress: string;
  region: regionType;
  id: number;
  organizer: {id: number; familyName: string; givenName: string};
  description: string;
  coverImage: File | string | null;
}

export interface DayEventProps {
  date: string;
  events: EventDataType[];
}

export interface eventUserDataType {
  createdAt: string;
  eventId: number;
  id: number;
  participantInterest: [];
  purpose: string;
  role: string;
  updatedAt: string;
  user: {
    id: number;
    belong: string;
    name: string;
    image: string;
    sns: SnsType[];
  };
}

export interface RequirementType {
  locationRequired: boolean;
  specializationRequired: boolean;
  companyRequired: boolean;
  interestRequired: boolean;
}

export interface QuestionType {
  type: string;
  question: string;
  isRequired: boolean;
  maxCount: number;
  options: string[];
}

//
export interface rsvpDataType {
  interest: string[];
  purpose: string;
}
