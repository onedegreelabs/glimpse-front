export interface ReactGridPositionType {
  i: string;
  h: number;
  w: number;
  x: number;
  y: number;
  isBounded?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  maxH?: number;
  maxW?: number;
  minH?: number;
  minW?: number;
  moved?: boolean;
  resizeHandles?: boolean;
  static?: boolean;
}

export interface SnsType {
  type: string;
  account: string;
}

export interface ProfileCardType {
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  userId?: number;
  type: string;
  content: string;
  sectionTitle: string;
  position: string;
}
