export type Size = {
  width: number;
  height: number;
};

export type Coords = {
  x: number;
  y: number;
};

export type GridCell = '0' | '1';

export type Grid = GridCell[][];
