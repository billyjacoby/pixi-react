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
  action?: () => void;
  isDisabled?: () => boolean;
  label: string;
  hotKey?: string;
};

export type InteractiveItem = CollidableItem & {
  action: InteractiveAction;
};

export type PlayerState = 'idle' | 'walking';

export type PlayerDirection = 'left' | 'right';

export type Level = {
  name: string;
  theme: 'basic';
  tileset: string;
  obstacles: string;
};
