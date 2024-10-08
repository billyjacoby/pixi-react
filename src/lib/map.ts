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

import { useAppDataStore } from '@/stores/appData';
import { GridCell, InteractiveAction, Level } from '../types';

export const BLOCKING_ITEMS = '1' as GridCell;

export const GRID_CELL_SIZE = 256;

export const levels: Level[] = [
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
    0 0 0 0 0 0 0 0 0 0 0 0 0 H 0
    0 S 4 0 0 0 0 4 0 0 0 0 0 0 0
    0 0 0 0 0 0 T 0 0 0 0 0 4 0 0
    0 0 0 0 0 0 0 0 0 0 4 0 0 4 0 
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 F 0 0 0
    0 I 0 0 0 0 0 0 0 0 0 0 0 0 0
    T 0 0 0 0 0 0 0 4 4 0 0 4 0 E
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
    0 0 0 0 0 I 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 E 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    `,
  },
];

export const obstacleCells = ['4', 'C', 'R', 'H', 'T', 'F', 'I'] as const;
export type ObstacleCellValue = (typeof obstacleCells)[number];
export const interactiveCells = ['S', 'E'] as const;
export type InteractiveCellValue = (typeof interactiveCells)[number];

export const interactiveActions: Record<
  (typeof interactiveCells)[number],
  InteractiveAction
> = {
  S: {
    action: () => useAppDataStore.getState().SIGN(),
    isDisabled: () => useAppDataStore.getState().currentLevelIndex <= 0,
    label: 'Return to previous level',
    hotKey: 'e',
  },
  E: {
    action: () => useAppDataStore.getState().NEXT_LEVEL(),
    isDisabled: () =>
      useAppDataStore.getState().currentLevelIndex >= levels.length - 1,
    label: 'Proceed to next level',
    hotKey: 'e',
  },
};

export const cellToTileMap = {
  '0': 'land_1.png',
} as const;
export type cellToTileMapKey = keyof typeof cellToTileMap;

export const cellToAssetNameMap = {
  S: 'sign.png',
  E: 'portal.png',
  '4': ['stones_1.png', 'stones_2.png', 'stones_3.png', 'stones_4.png'],
  H: 'building_1.png',
  I: 'building_2.png',
  T: ['tree_1.png', 'tree_2.png'],
  F: 'stone-face.png',
} as const;
export type cellToAssetNameMapKey = keyof typeof cellToAssetNameMap;
