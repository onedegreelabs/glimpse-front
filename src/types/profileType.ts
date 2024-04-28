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
