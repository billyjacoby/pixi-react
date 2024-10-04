import { Grid, GridCell, Coords, Size } from '../types';

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
  playerSize,
}: {
  grid: Grid;
  position: Coords;
  playerSize: Size;
}): GridCell {
  const gridYIndex = Math.floor(position.y / playerSize.height);
  const gridXIndex = Math.floor(position.x / playerSize.width);

  return grid[gridYIndex][gridXIndex];
}
