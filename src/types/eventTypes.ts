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
  coverImageKey: File | string;
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
  coverImageKey: File;
}

export interface DayEventProps {
  date: string;
  events: EventDataType[];
}
