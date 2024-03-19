export interface CreateEventType {
  title: String;
  startAt: Date;
  endAt: Date;
  dueAt: Date;
  type: String;
  handle: String;
  region: String;
  detailAddress: String;
  externalLink: String;
  description: String;
  coverImageKey: File;
}

export interface EventDataType {
  title: String;
  startAt: Date;
  endAt: Date;
  type: String;
  handle: String;
  externalLink: String;
  detailAddress: String;
  region: String;
  id: number;
  organizer: {id: number; familyName: String; givenName: String};
  description: String;
  coverImageKey: File;
}
