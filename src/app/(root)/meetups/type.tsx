export interface cardObj {
  color: string;
  content: [];
  id: number;
  isVisible: string;
  type: string;
}

export interface SnsType {
  id: number;
  type: string;
  account: string;
}

export interface User {
  id: number;
  familyName: string;
  givenName: string;
  sns: SnsType[];
}

export interface UserData {
  createdAt: string;
  updatedAt: string;
  id: number;
  eventId: number;
  role: string;
  purpose: string;
  user: User;
}
