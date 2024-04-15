export interface CreateEventType {
  organizationId: number;
  title: string;
  type: string;
  visibility: string;
  startDate: string;
  endDate: string;
  location: string;
  link: string;
  handle: string;
  description: string;
  tags: string[];
}
