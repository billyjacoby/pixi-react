/*
 * LEVEL NOTES:
 * Background image contains 4 tile in a 2 x 2
 * grid. Image dimensions are 256 x 256 so each block
 * is 128 x 128 pixels. Each grid item should then be
 * 128 x 128 pixels.
 *
 * Each level's grid should be a  rectangle.
 *
 * S = start
 * E = end
 * 0 = empty
 * 4 = stone
 * R = round building guy
 * C = cylinder building guy
 */

import { GridCell, InteractiveAction } from '../types';

export const BLOCKING_ITEMS = '1' as GridCell;

export const GRID_CELL_SIZE = 256;

export const levels = [
  {
    name: 'Level 1',
    theme: 'basic',
    tileset: `
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    `,
    obstacles: `
    0 0 0 0 0 0 0 0 0 0 0 0 0 C 0
    0 S 4 0 0 0 0 4 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 4 0 0 0 0 4 0 0
    0 0 0 0 0 0 0 0 0 0 4 0 0 4 0 
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 4 0 0 4 0 0
    0 C 0 0 0 0 0 0 0 0 0 0 4 0 0
    0 0 0 0 0 0 0 0 4 4 0 0 4 0 E
    `,
  },
  {
    name: 'Level 2',
    theme: 'basic',
    tileset: `
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    `,
    obstacles: `
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
    0 S 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 E
    `,
  },
];

export const obstacleCells = ['4', 'C', 'R'] as const;
export type ObstacleCellValue = (typeof obstacleCells)[number];
export const interactiveCells = ['S', 'E'] as const;
export type InteractiveCellValue = (typeof interactiveCells)[number];

export const interactiveActions: Record<
  (typeof interactiveCells)[number],
  InteractiveAction
> = {
  S: {
    name: 'SIGN',
  },
  E: {
    name: 'EXIT',
  },
};

export const cellToTileMap = {
  '0': 'land_1.png',
} as const;
export type cellToTileMapKey = keyof typeof cellToTileMap;

export const cellToAssetNameMap = {
  S: 'sign.png',
  E: 'exit.png',
  '4': ['stones_1.png', 'stones_2.png', 'stones_3.png', 'stones_4.png'],
  R: 'round_building.png',
  C: 'cylinder_building.png',
} as const;
export type cellToAssetNameMapKey = keyof typeof cellToAssetNameMap;
