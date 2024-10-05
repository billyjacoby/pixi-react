import { Grid, GridCell, Coords } from '../types';

import { GRID_CELL_SIZE } from './map';

//TODO: Make this actually type safe
export function gridFromString(grid: string): Grid {
  return grid
    .split('\n')
    .map((row) =>
      row
        .trim()
        .split(' ')
        .filter((item) => !!item)
    )
    .filter((row) => !!row.length) as GridCell[][];
}

export function getGridItemFromPosition({
  grid,
  position,
}: {
  grid: Grid;
  position: Coords;
}): GridCell {
  const gridYIndex = Math.floor(position.y / GRID_CELL_SIZE);
  const gridXIndex = Math.floor(position.x / GRID_CELL_SIZE);

  // return grid[gridYIndex][gridXIndex];
  return '0';
}
