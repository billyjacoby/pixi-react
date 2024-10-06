import type * as PIXI from 'pixi.js';

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

export type CollidableItem = Coords &
  Size & {
    ref: React.RefObject<PIXI.Sprite>;
    assetName: string;
  };

export type InteractiveAction = {
  name: string;
};

export type InteractiveItem = CollidableItem & {
  action: InteractiveAction;
};
