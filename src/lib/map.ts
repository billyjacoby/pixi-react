/*
 * LEVEL NOTES:
 * Background image contains 4 tile in a 2 x 2
 * grid. Image dimensions are 256 x 256 so each block
 * is 128 x 128 pixels. Each grid item should then be
 * 128 x 128 pixels.
 *
 * Each level's grid should be a  rectangle.
 */

import { GridCell } from '../types';

export const BLOCKING_ITEMS = '1' as GridCell;

export const GRID_CELL_SIZE = 128;

export const levels = [
  {
    name: 'Level 1',
    theme: 'basic',
    grid: `
    000000000000 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 1 1 1 1 1 1 1 1 1 0 1 1 0 0
    0 1 1 1 1 1 1 1 1 1 1 0 1 0 0
    0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 1 1 1 1 1 1 1 1 1 0 1 1 0 0
    0 1 1 1 1 1 1 1 1 1 1 0 1 0 0
    0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 
    `,
  },
];
