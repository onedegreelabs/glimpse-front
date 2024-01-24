export interface cardObj {
  color: string;
  content: [];
  id: number;
  isVisible: string;
  type: string;
}
export interface userData {
  belong: string;
  cards: cardObj[];
  department: string;
  displayName: string;
  firstName: string;
  id: number;
  introSnippet: string;
  lastName: string;
  location: string;
  profileImageUrl: string;
  viewCount: number;
}
