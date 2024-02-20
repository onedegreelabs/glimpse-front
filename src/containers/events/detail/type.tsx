export interface cardObj {
  color: string;
  content: (string | number)[];
  id: number;
  isVisible: string;
  type: string;
}
export interface userData {
  id: number;
  displayName: string;
  department: string;
  profileImageUrl: string;
  introSnippet: string;
  cards: cardObj[];
  // firstName: string;
  // lastName: string;
  // location: string;
  // viewCount: number;
}
