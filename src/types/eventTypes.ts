export interface CreateEventType {
  title: string;
  startAt: Date;
  endAt: Date;
  dueAt: Date;
  type: string;
  handle: string;
  region: string;
  detailAddress: string;
  externalLink: string;
  description: string;
  coverImageKey: File;
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
