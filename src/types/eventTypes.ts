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
